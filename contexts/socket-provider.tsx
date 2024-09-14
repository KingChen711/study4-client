/* eslint-disable @typescript-eslint/no-floating-promises */
"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { SERVER_SPEAKING_URL } from "@/constants/env"
import { useUser } from "@clerk/nextjs"
import Peer, { type SignalData } from "simple-peer"
import { io, type Socket } from "socket.io-client"

type SocketProviderProps = {
  children: React.ReactNode
}

type SocketContextType = {
  socket: Socket | null
  peer: PeerData | null
  status: SpeakingStatus
  localStream: MediaStream | null
  readyForSearching: boolean
  videoDevices: MediaDeviceInfo[]
  selectedVideoDeviceId: string | null
  handleSearchPartner: () => void
  handleEndCall: () => void
  setSelectedVideoDeviceId: React.Dispatch<React.SetStateAction<string | null>>
}

type SpeakingStatus = "idle" | "searching" | "connected"

type SocketUser = {
  clerkId: string
  socketId: string
  profile: {
    name: string
    avatar: string
  }
}

type PeerData = {
  peerConnection: Peer.Instance
  stream: MediaStream | undefined
  partner: SocketUser
}

export const SocketContext = createContext<SocketContextType | null>(null)

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [status, setStatus] = useState<SpeakingStatus>("idle")
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [peer, setPeer] = useState<PeerData | null>(null)

  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState<
    string | null
  >(null)

  const { user } = useUser()
  const currentUser = useMemo(() => {
    if (!socket || !user) return null
    return {
      clerkId: user.id,
      socketId: socket.id,
      profile: {
        name: user.primaryEmailAddress?.emailAddress,
        avatar: user.imageUrl,
      },
    } as SocketUser
  }, [user, socket])

  const readyForSearching = useMemo(() => {
    return !!(currentUser && socket && status === "idle")
  }, [currentUser, socket, status])

  const getMediaDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      )
      // const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
      // const audioOutputDevices = devices.filter(device => device.kind === 'audiooutput');

      setVideoDevices(videoDevices)
      // setAudioInputDevices(audioInputDevices);
      // setAudioOutputDevices(audioOutputDevices);

      if (videoDevices.length > 0) {
        setSelectedVideoDeviceId(videoDevices[0].deviceId) // Default to first video device
      }
      // if (audioInputDevices.length > 0) {
      //   setSelectedAudioInputDeviceId(audioInputDevices[0].deviceId); // Default to first audio input
      // }
      // if (audioOutputDevices.length > 0) {
      //   setSelectedAudioOutputDeviceId(audioOutputDevices[0].deviceId); // Default to first audio output
      // }
    } catch (error) {
      console.log("Failed to enumerate devices", error)
    }
  }, [])

  const getMediaSteam = useCallback(
    async (videoDeviceId = selectedVideoDeviceId) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 360, ideal: 720, max: 1080 },
            frameRate: { min: 16, ideal: 30, max: 30 },
            deviceId: videoDeviceId ? { exact: videoDeviceId } : undefined,
          },
        })

        return stream
      } catch (error) {
        console.log("Failed to get the stream", error)

        return null
      }
    },
    [selectedVideoDeviceId]
  )

  const handleSearchPartner = useCallback(() => {
    if (socket && currentUser) {
      setStatus("searching")
      socket.emit("findPartner", currentUser)
    }
  }, [socket, currentUser])

  const handleEndCall = useCallback(() => {
    if (peer) {
      peer.peerConnection.destroy()
    }
    if (socket) {
      socket.emit("endCall")
    }
    setPeer(null)
    setStatus("idle")
  }, [peer, socket])

  const createPeer = useCallback(
    async (stream: MediaStream | undefined, initiator: boolean) => {
      const iceServers: RTCIceServer[] = [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
          ],
        },
      ]

      const peer = new Peer({
        stream,
        initiator,
        trickle: true,
        config: { iceServers },
      })

      peer.on("stream", (stream) => {
        setPeer((prev) => {
          if (prev) {
            return {
              ...prev,
              stream,
            }
          }

          return prev
        })
      })

      peer.on("error", (error) => console.log("peer error", error))

      peer.on("close", handleEndCall)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rtcPeerConnection: RTCPeerConnection = (peer as any)._pc
      rtcPeerConnection.onconnectionstatechange = async () => {
        if (
          rtcPeerConnection.iceConnectionState === "disconnected" ||
          rtcPeerConnection.iceConnectionState === "failed"
        ) {
          handleEndCall()
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return peer
    },
    [handleEndCall]
  )

  const onPartnerFound = useCallback(
    async (partner: SocketUser) => {
      const stream = await getMediaSteam()
      setLocalStream(stream)

      const newPeer = await createPeer(stream || undefined, true)

      setPeer({
        peerConnection: newPeer,
        partner,
        stream: undefined,
      })

      newPeer.on("signal", async (data: SignalData) => {
        if (socket) {
          console.log("emit offer")
          socket.emit("webrtcSignal", {
            sdp: data,
            from: currentUser,
            to: partner,
          })
        }
      })
    },
    [createPeer, currentUser, getMediaSteam, socket]
  )

  const completePeerConnection = useCallback(
    async (connectionData: {
      sdp: SignalData
      to: SocketUser
      from: SocketUser
    }) => {
      if (peer) {
        peer.peerConnection.signal(connectionData.sdp)
        return
      }

      const newPeer = await createPeer(localStream || undefined, true)

      setPeer({
        peerConnection: newPeer,
        partner: connectionData.to,
        stream: undefined,
      })

      newPeer.on("signal", async (data: SignalData) => {
        if (socket) {
          console.log("emit offer")
          socket.emit("webrtcSignal", {
            sdp: data,
            to: connectionData.to,
            from: connectionData.from,
          })
        }
      })
    },
    [localStream, peer, createPeer, socket]
  )

  const updateStream = useCallback(
    async (selectedVideoDeviceId: string | null) => {
      if (!localStream || !peer) return

      const newStream = await getMediaSteam(selectedVideoDeviceId)
      if (!newStream) return
      if (
        localStream.getVideoTracks()[0].id === newStream.getVideoTracks()[0].id
      )
        return

      peer.peerConnection.replaceTrack(
        localStream.getVideoTracks()[0],
        newStream.getVideoTracks()[0],
        localStream
      )

      setLocalStream(newStream)
    },

    [getMediaSteam, localStream, peer]
  )

  useEffect(() => {
    console.log("getLocalStream")
    const getLocalStream = async () => {
      const stream = await getMediaSteam()
      setLocalStream(stream)

      if (!stream) {
        console.log("No stream found")
        return
      }
    }

    getLocalStream()
  }, [getMediaSteam])

  useEffect(() => {
    getMediaDevices()
  }, [getMediaDevices])

  // useEffect(() => {
  //   if (localStream && peer) {
  //     const newVideoTrack = localStream.getVideoTracks()[0]
  //     peer
  //   }
  // }, [localStream])

  //connect socket
  useEffect(() => {
    console.log("connect socket")
    const socketIo = io(SERVER_SPEAKING_URL)

    setSocket(socketIo)

    function cleanup() {
      socketIo.disconnect()
    }

    return cleanup
  }, [])

  useEffect(() => {
    console.log("onPartnerFound")
    if (!socket) return

    socket.on("partnerFound", onPartnerFound)

    return () => {
      if (socket) {
        socket.off("partnerFound", onPartnerFound)
      }
    }
  }, [socket, onPartnerFound])

  useEffect(() => {
    console.log("completePeerConnection")
    if (!socket) return

    socket.on("webrtcSignal", completePeerConnection)

    return () => {
      if (socket) {
        socket.off("webrtcSignal", completePeerConnection)
      }
    }
  }, [socket, completePeerConnection])

  useEffect(() => {
    if (peer) {
      setStatus("connected")
    }
  }, [peer])

  // useEffect(()=>{

  //     const newTrack = localStream?.getAudioTracks()[0]
  //     const oldTrack = peer?.peerConnection.replaceTrack()

  // },[localStream])

  useEffect(() => {
    updateStream(selectedVideoDeviceId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVideoDeviceId])

  return (
    <SocketContext.Provider
      value={{
        socket,
        videoDevices,
        readyForSearching,
        selectedVideoDeviceId,
        handleSearchPartner,
        handleEndCall,
        status,
        localStream,
        peer,
        setSelectedVideoDeviceId,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}

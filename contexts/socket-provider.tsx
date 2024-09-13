/* eslint-disable @typescript-eslint/no-floating-promises */
"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { SERVER_SPEAKING_URL } from "@/constants/env"
import { useUser } from "@clerk/nextjs"
import Peer, { type SignalData } from "simple-peer"
import { io, type Socket } from "socket.io-client"

export type TSendMessage = {
  receiverId: string
  senderId: string
  type: "Text" | "Image" | "Video"
} & (
  | {
      type: "Text"
      content: string
    }
  | {
      type: "Image"
      image: string
    }
  | {
      type: "Video"
      video: string
    }
)

type SocketProviderProps = {
  children: React.ReactNode
}

type SocketContextType = {
  socket: Socket | null
  hasConnected: boolean
  partner: SocketUser | null
  peer: PeerData | null
  status: SpeakingStatus
  localStream: MediaStream | null
  audioInputDevices: MediaDeviceInfo[]
  audioOutputDevices: MediaDeviceInfo[]
  videoInputDevices: MediaDeviceInfo[]
  handleSearchPartner: () => void
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

  //////TODO
  const [partner, setPartner] = useState<SocketUser | null>(null)
  //////TODO

  const { user } = useUser()
  const [peer, setPeer] = useState<PeerData | null>(null)
  const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>(
    []
  )
  const [audioOutputDevices, setAudioOutputDevices] = useState<
    MediaDeviceInfo[]
  >([])
  const [videoInputDevices, setVideoInputDevices] = useState<MediaDeviceInfo[]>(
    []
  )

  const [localStream, setLocalStream] = useState<MediaStream | null>(null)

  const getMediaSteam = useCallback(
    async (faceMode?: string) => {
      if (localStream) return localStream

      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        )

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 360, ideal: 720, max: 1080 },
            frameRate: { min: 16, ideal: 30, max: 30 },
            facingMode: videoDevices.length > 0 ? faceMode : undefined,
          },
        })
        setLocalStream(stream)
        return stream
      } catch (error) {
        console.log("Failed to get the stream", error)
        setLocalStream(null)
        return null
      }
    },
    [localStream]
  )

  const handleSearchPartner = useCallback(async () => {
    setStatus("searching")
    socket!.emit("findPartner", user)
  }, [socket, user])

  const handlePartnerDisconnected = useCallback(() => {
    console.log("partnerDisconnected")

    setPartner(null)
    handleSearchPartner()
  }, [handleSearchPartner])

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

      peer.on("close", handlePartnerDisconnected)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rtcPeerConnection: RTCPeerConnection = (peer as any)._pc
      rtcPeerConnection.onconnectionstatechange = async () => {
        if (
          rtcPeerConnection.iceConnectionState === "disconnected" ||
          rtcPeerConnection.iceConnectionState === "failed"
        ) {
          handlePartnerDisconnected()
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return peer
    },
    [handlePartnerDisconnected]
  )

  const handleFoundPartner = useCallback(
    async (partner: SocketUser) => {
      setPartner(partner)
      setStatus("connected")

      const stream = await getMediaSteam()

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
            partnerSocketId: partner.socketId,
            pair: {
              currentUser: {
                clerkId: user?.id,
                socketId: socket.id,
                profile: {
                  name: user?.primaryEmailAddress?.emailAddress,
                  avatar: user?.imageUrl,
                },
              },
              partner,
            },
          })
        }
      })
    },
    [createPeer, getMediaSteam, socket, user]
  )

  const completePeerConnection = useCallback(
    async (connectionData: {
      sdp: SignalData
      pair: { partner: SocketUser; currentUser: SocketUser }
    }) => {
      if (!localStream) return

      if (peer) {
        peer.peerConnection?.signal(connectionData.sdp)
        return
      }

      const newPeer = await createPeer(localStream || undefined, true)

      setPeer({
        peerConnection: newPeer,
        partner: connectionData.pair.currentUser,
        stream: undefined,
      })

      newPeer.on("signal", async (data: SignalData) => {
        if (socket) {
          console.log("emit offer")
          socket.emit("webrtcSignal", {
            sdp: data,
            partnerSocketId: connectionData.pair.currentUser.socketId,
            pair: {
              currentUser: connectionData.pair.partner,
              partner: connectionData.pair.currentUser,
            },
          })
        }
      })
    },
    [localStream, peer, createPeer, socket]
  )

  useEffect(() => {
    const getLocalStream = async () => {
      const stream = await getMediaSteam()

      if (!stream) {
        console.log("No stream found")
        return
      }
    }

    getLocalStream()
  }, [getMediaSteam])

  useEffect(() => {
    // Fetch media devices
    const getMediaDevices = async () => {
      try {
        // Request permission to access audio and video devices
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        })
        stream.getTracks().forEach((track) => track.stop())

        // Get list of all media devices
        const devices = await navigator.mediaDevices.enumerateDevices()

        // Filter devices by type
        const audioInputs = devices.filter(
          (device) => device.kind === "audioinput"
        )
        const audioOutputs = devices.filter(
          (device) => device.kind === "audiooutput"
        )
        const videoInputs = devices.filter(
          (device) => device.kind === "videoinput"
        )

        // Update state with filtered devices
        setAudioInputDevices(audioInputs)
        setAudioOutputDevices(audioOutputs)
        setVideoInputDevices(videoInputs)
      } catch (error) {
        console.error("Error accessing media devices:", error)
      }
    }

    getMediaDevices()
  }, [])

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
    if (!socket) return

    socket.on("partnerFound", handleFoundPartner)

    return () => {
      socket.off("partnerFound", handleFoundPartner)
    }
  }, [socket, handleFoundPartner])

  useEffect(() => {
    if (!socket) return

    socket.on("webrtcSignal", completePeerConnection)

    return () => {
      socket.off("webrtcSignal", completePeerConnection)
    }
  }, [socket, completePeerConnection])

  useEffect(() => {
    if (!socket) return

    socket.on("partnerDisconnected", handlePartnerDisconnected)

    return () => {
      socket.off("partnerDisconnected", handlePartnerDisconnected)
    }
  }, [socket, user, handleSearchPartner, handlePartnerDisconnected])

  return (
    <SocketContext.Provider
      value={{
        socket,
        hasConnected: !!socket?.connected,
        handleSearchPartner,
        partner,
        status,
        localStream,
        audioInputDevices,
        audioOutputDevices,
        videoInputDevices,
        peer,
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

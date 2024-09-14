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
  const { user } = useUser()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [status, setStatus] = useState<SpeakingStatus>("idle")
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [peer, setPeer] = useState<PeerData | null>(null)

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

  const handleSearchPartner = useCallback(() => {
    if (socket && user) {
      setStatus("searching")
      socket.emit("findPartner", user)
    }
  }, [socket, user])

  const handlePartnerDisconnected = useCallback(() => {
    console.log("partnerDisconnected")
    setPeer(null)
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

  const onPartnerFound = useCallback(
    async (partner: SocketUser) => {
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

  useEffect(() => {
    console.log("getLocalStream")
    const getLocalStream = async () => {
      const stream = await getMediaSteam()

      if (!stream) {
        console.log("No stream found")
        return
      }
    }

    getLocalStream()
  }, [getMediaSteam])

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
    console.log("partnerDisconnected")
    if (!socket) return

    socket.on("partnerDisconnected", handlePartnerDisconnected)

    return () => {
      if (socket) {
        socket.off("partnerDisconnected", handlePartnerDisconnected)
      }
    }
  }, [socket, handlePartnerDisconnected])

  return (
    <SocketContext.Provider
      value={{
        socket,
        readyForSearching,
        handleSearchPartner,
        status,
        localStream,
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

import React, { createContext, useContext, useMemo } from "react"
import { useAuth } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query"

import prep4Api from "@/lib/prep4-api"

//TODO: unused now, may be delete later

type AuthProviderProps = {
  children: React.ReactNode
}

type User = {
  userId: string
  role: Role
}

type Role = {
  roleName: string
}

type TRole = "Staff" | "Admin" | "Student" | "Guest"

export type AuthContextType = {
  user: User | null
  role: TRole
  isLoadingAuth: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getToken } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ["users", "who-am-i"],
    queryFn: async () =>
      prep4Api
        .get<User>("/api/users/who-am-i", {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        .then((res) => res.data),
  })

  const user = useMemo(() => data || null, [data])

  const role = useMemo(() => {
    const role = user?.role.roleName
    return role ? (role as TRole) : "Guest"
  }, [user])

  return (
    <AuthContext.Provider value={{ user, role, isLoadingAuth: isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider")
  }
  return context
}

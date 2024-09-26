import axios from "axios"

const prep4Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export default prep4Api

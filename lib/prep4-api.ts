import axios from "axios"

const prep4Api = axios.create({
  baseURL: "http://localhost:7000",
  headers: {
    "Content-Type": "application/json",
  },
})

export default prep4Api

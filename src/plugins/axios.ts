import axios, { AxiosError, AxiosResponse } from "axios"
export const myAxios = axios.create({
  baseURL: "http://localhost:3000/api"
})

myAxios.interceptors.request.use((req) => {
  if (req.headers) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  }
  return req
})

myAxios.interceptors.response.use(
  async (res: AxiosResponse) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(res)
    return res
  },
  async (err: AxiosError) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.error(err.response)
    if (err.response?.status == 429) {
      alert("一定時間にアクセスが集中したため、しばらくアクセスできません")
    }
    throw err
  }
)

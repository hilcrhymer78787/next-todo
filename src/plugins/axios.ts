import axios, { AxiosError, AxiosResponse } from "axios"

export const myAxios = axios.create({
  baseURL: "http://localhost:3000/api"
})
myAxios.interceptors.response.use(
  (res: AxiosResponse) => {
    console.log(res)
    return res
  },
  (err: AxiosError) => {
    console.error(err.response)
    if (err.response?.status == 429) {
      alert("一定時間にアクセスが集中したため、しばらくアクセスできません")
    }
    throw err
  }
)

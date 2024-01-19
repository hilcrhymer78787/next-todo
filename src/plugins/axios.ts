import { AxiosResponse, AxiosError } from "axios"
import axios from "axios"

export const api = axios.create()

api.interceptors.response.use(
  (res: AxiosResponse) => {
    console.log(res)
    return res
  },
  (err: any) => {
    console.log("リクエストがキャンセルされました")
    if (err.response?.status == 429) {
      alert("一定時間にアクセスが集中したため、しばらくアクセスできません")
    }
    throw err
  }
)

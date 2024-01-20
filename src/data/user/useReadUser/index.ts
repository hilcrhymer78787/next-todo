import React from "react"
import { myAxios } from "@/plugins/axios"
export const useReadUser = () => {
  const [readUserLoading, setReadUserLoading] = React.useState(false)
  const [readUserError, setReadUserError] = React.useState("")
  const [user, setUser] = React.useState(null)
  const readUser = async () => {
    setReadUserError("")
    setReadUserLoading(true)
    const requestConfig = {
      url: "/user/read",
      method: "GET",
    }
    return myAxios(requestConfig)
      .then((res) => {
        setUser(res.data)
        return res
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.errorMessage
        const errorStatusText = `${err?.response?.status}：${err?.response?.statusText}`
        setReadUserError(errorMessage ?? errorStatusText)
      })
      .finally(() => {
        setReadUserLoading(false)
      })
  }

  return {
    user,
    readUser,
    readUserError,
    readUserLoading
  }
}

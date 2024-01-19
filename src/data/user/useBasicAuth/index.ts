import React from "react"
import { myAxios } from "@/plugins/axios"
export const useBasicAuth = () => {
  const [basicAuthLoading, setBasicAuthLoading] = React.useState(false)
  const [basicAuthError, setBasicAuthError] = React.useState("")
  const [emailError, setEmailError] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")
  const basicAuth = async (email: string, password: string) => {
    setBasicAuthError("")
    setEmailError("")
    setPasswordError("")
    let isError = false
    if (!/.+@.+\..+/.test(email)) {
      setEmailError("正しい形式で入力してください")
      isError = true
    }
    if (password.length < 8) {
      setPasswordError("パスワードは8桁以上です")
      isError = true
    }
    if (isError) return
    setBasicAuthLoading(true)
    const requestConfig = {
      url: "/user/auth/basic",
      method: "POST",
      data: { email, password }
    }
    return myAxios(requestConfig)
      .then((res) => {
        return res
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.errorMessage
        const errorStatusText = `${err?.response?.status}：${err?.response?.statusText}`
        setBasicAuthError(errorMessage ?? errorStatusText)
      })
      .finally(() => {
        setBasicAuthLoading(false)
      })
  }

  return {
    basicAuth,
    basicAuthError,
    basicAuthLoading,
    emailError,
    passwordError
  }
}

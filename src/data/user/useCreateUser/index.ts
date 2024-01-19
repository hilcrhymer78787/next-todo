import React from "react"
import { myAxios } from "@/plugins/axios"
export const useCreateUser = () => {
  const [createUserLoading, setCreateUserLoading] = React.useState(false)
  const [createUserError, setCreateUserError] = React.useState("")
  const [emailError, setEmailError] = React.useState("")
  const [nameError, setNameError] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")
  const createUser = async (name: string, email: string, password: string, passwordConfirm: string) => {
    setCreateUserError("")
    setNameError("")
    setEmailError("")
    setPasswordError("")
    let isError = false
    if (!/.+@.+\..+/.test(email)) {
      setEmailError("正しい形式で入力してください")
      isError = true
    }
    if (!name) {
      setNameError("名前は必須です")
      isError = true
    }
    if (password !== passwordConfirm) {
      setPasswordError("パスワードが一致しません")
      isError = true
    }
    if (password.length < 8) {
      setPasswordError("パスワードは8桁以上で設定してください")
      isError = true
    }
    if (isError) return
    setCreateUserLoading(true)
    const requestConfig = {
      url: "/user/create",
      method: "POST",
      data: { name, email, password }
    }
    return myAxios(requestConfig)
      .then((res) => {
        return res
      })
      .catch(() => {
        setCreateUserError("通信に失敗しました")
      })
      .finally(() => {
        setCreateUserLoading(false)
      })
  }

  return {
    createUser,
    createUserError,
    emailError,
    passwordError,
    nameError,
    createUserLoading
  }
}

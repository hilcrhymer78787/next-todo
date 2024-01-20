import { myAxios } from "@/plugins/axios"
import { useState } from "react"
export const useCreateUser = () => {
  const [createUserLoading, setCreateUserLoading] = useState(false)
  const [createUserError, setCreateUserError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [nameError, setNameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
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
        localStorage.setItem("token", res.data.token)
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

import React from "react"
export const useCreateUser = () => {
  const [createUserLoading, setCreateUserLoading] = React.useState(false)
  const [createUserError, setCreateUserError] = React.useState("")
  const [emailError, setEmailError] = React.useState("")
  const [nameError, setNameError] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")
  const createUser = async (
    email: string,
    password: string,
    name: string,
  ) => {
    setCreateUserError("")
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
    if (password.length < 8) {
      setPasswordError("パスワードは8桁以上で設定してください")
      isError = true
    }
    if (isError) throw new Error("登録に失敗しました")
    setCreateUserLoading(true)
    // axios
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

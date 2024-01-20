import { atom, useRecoilState } from "recoil"

import React from "react"
import { errHandler } from "@/data/common"
import { myAxios } from "@/plugins/axios"

type User = {
  name: string
  email: string
}
export const userAtom = atom<User | null>({
  key: "user",
  default: null
})
export const useReadUser = () => {
  const [readUserLoading, setReadUserLoading] = React.useState(false)
  const [readUserError, setReadUserError] = React.useState("")
  const [user, setUser] = useRecoilState(userAtom)
  const readUser = async () => {
    setReadUserError("")
    setReadUserLoading(true)
    const requestConfig = {
      url: "/user/read",
      method: "GET"
    }
    return myAxios(requestConfig)
      .then((res) => {
        setUser(res.data)
        return res
      })
      .catch((err) => {
        errHandler(err, setReadUserError)
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

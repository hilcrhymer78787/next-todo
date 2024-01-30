import { errHandler } from "@/data/common"
import { myAxios } from "@/plugins/axios"
import { useState } from "react"

export const useUpdateTask = () => {
  const [updateTaskLoading, setUpdateTaskLoading] = useState(false)
  const [updateTaskError, setUpdateTaskError] = useState("")
  const [nameError, setNameError] = useState("")
  const [isDoneError, setIsDoneError] = useState("")
  const updateTask = async (name: string, isDone: boolean) => {
    setUpdateTaskError("")
    setNameError("")
    setIsDoneError("")
    let isError = false
    if (!name) {
      setNameError("名前は必須です")
      isError = true
    }
    if (isError) return
    setUpdateTaskLoading(true)
    const requestConfig = {
      url: "/task/update",
      method: "POST",
      data: { name, isDone }
    }
    return myAxios(requestConfig)
      .then((res) => {
        return res
      })
      .catch((err) => {
        errHandler(err, setUpdateTaskError)
      })
      .finally(() => {
        setUpdateTaskLoading(false)
      })
  }

  return {
    updateTask,
    updateTaskError,
    updateTaskLoading,
    nameError,
    isDoneError
  }
}

import { atom, useRecoilState } from "recoil"

import { Task } from "@/data/task/useReadTasks"
import { errHandler } from "@/data/common"
import { myAxios } from "@/plugins/axios"
import { useState } from "react"

export const useCreateTask = () => {
  const [createTaskLoading, setCreateTaskLoading] = useState(false)
  const [createTaskError, setCreateTaskError] = useState("")
  const [nameError, setNameError] = useState("")
  const [isDoneError, setIsDoneError] = useState("")
  const createTask = async (name: string, isDone: boolean) => {
    setCreateTaskError("")
    setNameError("")
    setIsDoneError("")
    let isError = false
    if (!name) {
      setNameError("名前は必須です")
      isError = true
    }
    if (isError) return
    setCreateTaskLoading(true)
    const requestConfig = {
      url: "/task/create",
      method: "POST",
      data: { name, isDone }
    }
    return myAxios(requestConfig)
      .then((res) => {
        return res
      })
      .catch((err) => {
        errHandler(err, setCreateTaskError)
      })
      .finally(() => {
        setCreateTaskLoading(false)
      })
  }

  return {
    createTask,
    createTaskError,
    createTaskLoading,
    nameError,
    isDoneError
  }
}

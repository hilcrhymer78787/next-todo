import { atom, useRecoilState } from "recoil"

import { errHandler } from "@/data/common"
import { myAxios } from "@/plugins/axios"
import { useState } from "react"
import { Task } from "@/data/task/useReadTasks"

export const useReadTask = () => {
  const [readTaskLoading, setReadTaskLoading] = useState(false)
  const [readTaskError, setReadTaskError] = useState("")
  const [task, setTask] = useState<Task | null>(null)
  const readTask = async (id: string) => {
    setReadTaskError("")
    setReadTaskLoading(true)
    const requestConfig = {
      url: "/task/read",
      method: "GET",
      params: { id }
    }
    return myAxios(requestConfig)
      .then((res) => {
        setTask(res.data)
        return res
      })
      .catch((err) => {
        errHandler(err, setReadTaskError)
      })
      .finally(() => {
        setReadTaskLoading(false)
      })
  }

  return {
    task,
    readTask,
    readTaskError,
    readTaskLoading
  }
}

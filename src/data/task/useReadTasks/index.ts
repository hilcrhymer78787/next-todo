import { atom, useRecoilState } from "recoil"

import { errHandler } from "@/data/common"
import { myAxios } from "@/plugins/axios"
import { useState } from "react"

type Task = {
  id: number
  name: string
  isDone: boolean
}
export const useReadTasks = () => {
  const [readTasksLoading, setReadTasksLoading] = useState(false)
  const [readTasksError, setReadTasksError] = useState("")
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const readTasks = async () => {
    setReadTasksError("")
    setReadTasksLoading(true)
    const requestConfig = {
      url: "/task/readall",
      method: "GET"
    }
    return myAxios(requestConfig)
      .then((res) => {
        setTasks(res.data)
        return res
      })
      .catch((err) => {
        errHandler(err, setReadTasksError)
      })
      .finally(() => {
        setReadTasksLoading(false)
      })
  }

  return {
    tasks,
    readTasks,
    readTasksError,
    readTasksLoading
  }
}

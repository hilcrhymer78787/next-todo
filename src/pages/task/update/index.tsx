import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material"
import { useEffect, useState } from "react"

import AuthLayout from "@/layouts/AuthLayout"
import ErrTxt from "@/components/common/ErrTxt"
import Loading from "@/components/common/Loading"
import LoadingButton from "@mui/lab/LoadingButton"
import { Task } from "@/data/task/useReadTasks"
import { useReadTask } from "@/data/task/useReadTask"
import { useRouter } from "next/router"
import { useUpdateTask } from "@/data/task/useUpdateTask"

const TaskUpdate = () => {
  return (
    <AuthLayout>
      <Card data-testid="TaskUpdate">
        <CardHeader title="タスクの編集" />
        <TaskUpdateMain />
      </Card>
    </AuthLayout>
  )
}

const TaskUpdateMain = () => {
  const router = useRouter()
  const { task, readTask, readTaskError, readTaskLoading } = useReadTask()
  const onClickReturn = () => {
    router.push("/task")
  }
  useEffect(() => {
    const { taskId } = router.query
    if (!taskId) return
    if (Array.isArray(taskId)) return
    readTask(taskId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const TaskForm = () => {
    if (readTaskLoading) return <Loading />
    if (readTaskError) return <ErrTxt txt={readTaskError} />
    if (!task) return <></>
    return <TaskUpdateMainContent task={task} />
  }

  return (
    <Box data-testid="TaskUpdateMain">
      <TaskForm />
      {!task && (
        <CardActions>
          <Button onClick={onClickReturn} data-testid="TaskUpdateReturnBtn">
            タスク一覧へ戻る
          </Button>
        </CardActions>
      )}
    </Box>
  )
}

type TaskUpdateMainContentProps = {
  task: Task
}
const TaskUpdateMainContent = ({ task }: TaskUpdateMainContentProps) => {
  const router = useRouter()
  const { nameError, isDoneError, updateTaskLoading, updateTask, updateTaskError } = useUpdateTask()
  const [name, setName] = useState(task.name)
  const [isDone, setIsDone] = useState(Number(task.isDone))
  const submit = async () => {
    const res = await updateTask(name, Boolean(isDone))
    if (res) await router.push("/task")
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) submit()
  }
  const onClickReturn = () => {
    router.push("/task")
  }
  return (
    <Box data-testid="TaskUpdateMainContent">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            label="タスク名"
            error={!!nameError}
            helperText={<span data-testid="TaskUpdateNameErr">{nameError}</span>}
            onKeyDown={onKeyDown}
            inputProps={{ "data-testid": "TaskUpdateName" }}
          />
        </Box>
        <Box>
          <FormControl sx={{ width: "195px" }}>
            <InputLabel>状態</InputLabel>
            <Select
              label="状態"
              sx={{ width: "195px" }}
              value={isDone}
              error={!!isDoneError}
              onChange={(e) => {
                setIsDone(Number(e.target.value))
              }}
              inputProps={{ "data-testid": "TaskUpdateIsDone" }}
            >
              <MenuItem value={0}>未</MenuItem>
              <MenuItem value={1}>済</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ErrTxt txt={updateTaskError} testId="TaskUpdateErr" />
      </CardContent>
      <CardActions>
        <Button onClick={onClickReturn} data-testid="TaskUpdateReturnBtn">
          タスク一覧へ戻る
        </Button>
        <LoadingButton
          onClick={submit}
          loading={updateTaskLoading}
          disabled={!task}
          data-testid="TaskUpdateSubmitBtn"
          variant="contained"
        >
          登録
        </LoadingButton>
      </CardActions>
    </Box>
  )
}

export default TaskUpdate

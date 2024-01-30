import AuthLayout from "@/layouts/AuthLayout"
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
import { useState } from "react"

import LoadingButton from "@mui/lab/LoadingButton"
import { useUpdateTask } from "@/data/task/useUpdateTask"
import { useRouter } from "next/router"
import ErrTxt from "@/components/common/ErrTxt"
const TaskUpdate = () => {
  const router = useRouter()
  const { nameError, isDoneError, updateTaskLoading, updateTask, updateTaskError } = useUpdateTask()
  const [name, setName] = useState("")
  const [isDone, setIsDone] = useState(0)
  const submit = async () => {
    const res = await updateTask(name, Boolean(isDone))
    if (res) await router.push("/task")
  }
  const onClickReturn = () => {
    router.push("/task")
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) submit()
  }
  return (
    <AuthLayout>
      <Card data-testid="TaskUpdate">
        <CardHeader title="タスクの追加" />
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
          <ErrTxt txt={updateTaskError} testId="TaskUpdateErr"/>
        </CardContent>
        <CardActions>
          <Button onClick={onClickReturn} data-testid="TaskUpdateReturnBtn">
            タスク一覧へ戻る
          </Button>
          <LoadingButton
            onClick={submit}
            loading={updateTaskLoading}
            data-testid="TaskUpdateSubmitBtn"
            variant="contained"
          >
            登録
          </LoadingButton>
        </CardActions>
      </Card>
    </AuthLayout>
  )
}
export default TaskUpdate

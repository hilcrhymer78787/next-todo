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
import { useCreateTask } from "@/data/task/useCreateTask"
import { useRouter } from "next/router"
import ErrTxt from "@/components/common/ErrTxt"
const TaskCreate = () => {
  const router = useRouter()
  const { nameError, isDoneError, createTaskLoading, createTask, createTaskError } = useCreateTask()
  const [name, setName] = useState("")
  const [isDone, setIsDone] = useState(0)
  const submit = async () => {
    const res = await createTask(name, Boolean(isDone))
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
      <Card data-testid="TaskCreate">
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
              helperText={<span data-testid="TaskCreateNameErr">{nameError}</span>}
              onKeyDown={onKeyDown}
              inputProps={{ "data-testid": "TaskCreateName" }}
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
                inputProps={{ "data-testid": "TaskCreateIsDone" }}
              >
                <MenuItem value={0}>未</MenuItem>
                <MenuItem value={1}>済</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <ErrTxt txt={createTaskError} testId="TaskCreateErr"/>
        </CardContent>
        <CardActions>
          <Button onClick={onClickReturn} data-testid="TaskCreateReturnBtn">
            タスク一覧へ戻る
          </Button>
          <LoadingButton
            onClick={submit}
            loading={createTaskLoading}
            data-testid="TaskCreateSubmitBtn"
            variant="contained"
          >
            登録
          </LoadingButton>
        </CardActions>
      </Card>
    </AuthLayout>
  )
}
export default TaskCreate

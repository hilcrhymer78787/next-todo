import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material"
import { useMemo, useState } from "react"

import LoadingButton from "@mui/lab/LoadingButton"
import { useCreateTask } from "@/data/task/useCreateTask"
import { useReadUser } from "@/data/user/useReadUser"
import { useRouter } from "next/router"

const TaskCreateContent = () => {
  const router = useRouter()
  const { nameError, isDoneError, createTaskLoading } = useCreateTask()
  // const { readUser, readUserError, readUserLoading } = useReadUser()
  // const isLoading = useMemo(() => basicAuthLoading || readUserLoading, [basicAuthLoading, readUserLoading])
  // const apiError = useMemo(() => {
  //   if (!!basicAuthError) return basicAuthError
  //   if (!!readUserError) return readUserError
  //   return ""
  // }, [basicAuthError, readUserError])
  const [name, setName] = useState("")
  const [isDone, setIsDone] = useState(0)
  const submit = async () => {
    // const res = await basicAuth(name, isDone)
    // if (res) await readUser()
  }
  const onClickReturn = () => {
    router.push("/task")
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) submit()
  }
  return (
    <Box>
      <CardContent data-testid="TaskCreateContent">
        <Box sx={{ mb: 2 }}>
          <TextField
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            label="タスク名"
            error={!!nameError}
            helperText={<span data-testid="TaskCreateContentNameErr">{nameError}</span>}
            onKeyDown={onKeyDown}
            inputProps={{ "data-testid": "TaskCreateContentName" }}
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
              inputProps={{ "data-testid": "TaskCreateContentIsDone" }}
            >
              <MenuItem value={0}>未</MenuItem>
              <MenuItem value={1}>済</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={onClickReturn} data-testid="NewUserToLogin">
          タスク一覧へ戻る
        </Button>
        <LoadingButton onClick={submit} loading={createTaskLoading} data-testid="submitBtn" variant="contained">
          登録
        </LoadingButton>
      </CardActions>
    </Box>
  )
}
export default TaskCreateContent

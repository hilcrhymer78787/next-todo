import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography
} from "@mui/material"

import LoadingButton from "@mui/lab/LoadingButton"
import React from "react"
import { useCreateUser } from "@/data/user/useCreateUser"

const Home = () => {
  const [isNew, setIsNew] = React.useState(false)
  const { createUser, createUserError, nameError, emailError, passwordError, createUserLoading } =
    useCreateUser()
  const [displayName, setDisplayName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [passwordConfirm, setPasswordConfirm] = React.useState("")
  const submit = async () => {
    try {
      await createUser(email, password, passwordConfirm)
    } catch (e) {}
  }
  return (
    <Card sx={{m:5}}>
      <CardHeader title="新規ユーザー登録" sx={{ display: "flex", alignItems: "center" }} />
      <Divider />
      <CardContent>
        <TextField
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value)
          }}
          label="名前"
          error={!!nameError}
          helperText={nameError}
          onKeyDown={(e: any) => {
            if (e.keyCode !== 13) return
            submit()
          }}
          sx={{ mb: 3 }}
        />
        <TextField
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          label="メールアドレス"
          error={!!emailError}
          helperText={emailError}
          onKeyDown={(e: any) => {
            if (e.keyCode !== 13) return
            submit()
          }}
          sx={{ mb: 3 }}
        />
        <TextField
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          label="パスワード"
          error={!!passwordError}
          helperText={passwordError}
          onKeyDown={(e: any) => {
            if (e.keyCode !== 13) return
            submit()
          }}
          sx={{ mb: 3 }}
        />
        {/* <TextField
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value)
          }}
          label="パスワード確認"
          onKeyDown={(e: any) => {
            if (e.keyCode !== 13) return
            submit()
          }}
        /> */}
        {!!createUserError && (
          <Typography sx={{ p: 1 }} color="error">
            {createUserError}
          </Typography>
        )}
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          onClick={() => {
            setIsNew(false)
          }}
        >
          ログイン画面へ
        </Button>
        <LoadingButton onClick={submit} loading={createUserLoading} variant="contained">
          登録
        </LoadingButton>
      </CardActions>
    </Card>
  )
}
export default Home
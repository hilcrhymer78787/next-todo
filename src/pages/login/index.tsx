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
import { useCreateUser } from "@/data/user/useCreateUser/index"

const Login = () => {
  const [isNew, setIsNew] = React.useState(false)
  const { createUser, createUserError, nameError, emailError, passwordError, createUserLoading } =
    useCreateUser()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [passwordConfirm, setPasswordConfirm] = React.useState("")
  const submit = async () => {
    await createUser(name, email, password, passwordConfirm)
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) submit()
  }

  return (
    <Card sx={{ m: 5 }} data-testid="Login">
      <CardHeader title="新規ユーザー登録" sx={{ display: "flex", alignItems: "center" }} />
      <Divider />
      <CardContent>
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          label="名前"
          error={!!nameError}
          helperText={<span data-testid="loginNameErr">{nameError}</span>}
          onKeyDown={onKeyDown}
          sx={{ mb: 3 }}
          inputProps={{ 'data-testid': "loginName" }}
        />
        <TextField
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          label="メールアドレス"
          error={!!emailError}
          helperText={<span data-testid="loginEmailErr">{emailError}</span>}
          onKeyDown={onKeyDown}
          sx={{ mb: 3 }}
          inputProps={{ 'data-testid': "loginEmail" }}
        />
        <TextField
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          label="パスワード"
          error={!!passwordError}
          helperText={<span data-testid="loginPasswordErr">{passwordError}</span>}
          onKeyDown={onKeyDown}
          sx={{ mb: 3 }}
          inputProps={{ 'data-testid': "loginPassword" }}
        />
        <TextField
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value)
          }}
          label="パスワード確認"
          onKeyDown={onKeyDown}
          inputProps={{ 'data-testid': "loginPasswordConfirm" }}
        />
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
        <LoadingButton
          onClick={submit}
          loading={createUserLoading}
          data-testid="submitBtn"
          variant="contained">
          登録
        </LoadingButton>
      </CardActions>
    </Card>
  )
}
export default Login
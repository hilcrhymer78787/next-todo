import {
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

const Login = ({ setIsNew }: { setIsNew: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { createUser, createUserError, nameError, emailError, passwordError, createUserLoading } = useCreateUser()
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
      <CardHeader title="ログイン" sx={{ display: "flex", alignItems: "center" }} />
      <Divider />
      <CardContent>
        <Box>
          <TextField
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            label="名前"
            error={!!nameError}
            helperText={<span data-testid="loginNameErr">{nameError}</span>}
            onKeyDown={onKeyDown}
            inputProps={{ "data-testid": "loginName" }}
          />
        </Box>
        <Box>
          <TextField
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            label="メールアドレス"
            error={!!emailError}
            helperText={<span data-testid="loginEmailErr">{emailError}</span>}
            onKeyDown={onKeyDown}
            inputProps={{ "data-testid": "loginEmail" }}
          />
        </Box>
        <Box>
          <TextField
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            label="パスワード"
            error={!!passwordError}
            helperText={<span data-testid="loginPasswordErr">{passwordError}</span>}
            onKeyDown={onKeyDown}
            inputProps={{ "data-testid": "loginPassword" }}
          />
        </Box>
        <Box>
          <TextField
            value={passwordConfirm}
            onChange={(e) => { setPasswordConfirm(e.target.value) }}
            label="パスワード確認"
            onKeyDown={onKeyDown}
            inputProps={{ "data-testid": "loginPasswordConfirm" }}
          />
        </Box>
        {!!createUserError && (
          <Typography sx={{ p: 1 }} color="error" data-testid="loginApiErr">
            {createUserError ?? ""}
          </Typography>
        )}
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={() => { setIsNew(true) }}>
          新規登録画面へ
        </Button>
        <LoadingButton onClick={submit} loading={createUserLoading} data-testid="submitBtn" variant="contained">
          登録
        </LoadingButton>
      </CardActions>
    </Card>
  )
}
export default Login

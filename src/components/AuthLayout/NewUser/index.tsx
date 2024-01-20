import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Typography } from "@mui/material"

import LoadingButton from "@mui/lab/LoadingButton"
import { useCreateUser } from "@/data/user/useCreateUser/index"
import { useState } from "react"

type Props = {
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>
}
const NewUser = ({ setIsNew }: Props) => {
  const { createUser, createUserError, nameError, emailError, passwordError, createUserLoading } = useCreateUser()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const submit = async () => {
    await createUser(name, email, password, passwordConfirm)
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) submit()
  }

  return (
    <Card sx={{ m: 5 }} data-testid="NewUser">
      <CardHeader title="新規ユーザー登録" sx={{ display: "flex", alignItems: "center" }} />
      <Divider />
      <CardContent>
        <Box>
          <TextField
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            label="名前"
            error={!!nameError}
            helperText={<span data-testid="NewUserNameErr">{nameError}</span>}
            onKeyDown={onKeyDown}
            inputProps={{ "data-testid": "NewUserName" }}
          />
        </Box>
        <Box>
          <TextField
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            label="メールアドレス"
            error={!!emailError}
            helperText={<span data-testid="NewUserEmailErr">{emailError}</span>}
            onKeyDown={onKeyDown}
            inputProps={{ "data-testid": "NewUserEmail" }}
          />
        </Box>
        <Box>
          <TextField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            label="パスワード"
            error={!!passwordError}
            helperText={<span data-testid="NewUserPasswordErr">{passwordError}</span>}
            onKeyDown={onKeyDown}
            inputProps={{ "data-testid": "NewUserPassword" }}
          />
        </Box>
        <Box>
          <TextField
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value)
            }}
            label="パスワード確認"
            onKeyDown={onKeyDown}
            inputProps={{ "data-testid": "NewUserPasswordConfirm" }}
          />
        </Box>
        {!!createUserError && (
          <Typography sx={{ p: 1 }} color="error" data-testid="NewUserApiErr">
            {createUserError ?? ""}
          </Typography>
        )}
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          onClick={() => {
            setIsNew(false)
          }}
          data-testid="NewUserToLogin"
        >
          ログイン画面へ
        </Button>
        <LoadingButton onClick={submit} loading={createUserLoading} data-testid="submitBtn" variant="contained">
          登録
        </LoadingButton>
      </CardActions>
    </Card>
  )
}
export default NewUser

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Typography
} from "@mui/material"
import { useMemo, useState } from "react"

import LoadingButton from "@mui/lab/LoadingButton"
import { useBasicAuth } from "@/data/user/useBasicAuth"
import { useReadUser } from "@/data/user/useReadUser"
import ErrTxt from "@/components/common/ErrTxt"

type Props = {
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>
}
const Login = ({ setIsNew }: Props) => {
  const { basicAuth, basicAuthError, emailError, passwordError, basicAuthLoading } = useBasicAuth()
  const { readUser, readUserError, readUserLoading } = useReadUser()
  const isLoading = useMemo(() => basicAuthLoading || readUserLoading, [basicAuthLoading, readUserLoading])
  const apiError = useMemo(() => {
    if (!!basicAuthError) return basicAuthError
    if (!!readUserError) return readUserError
    return ""
  }, [basicAuthError, readUserError])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const submit = async () => {
    const res = await basicAuth(email, password)
    if (res) await readUser()
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) submit()
  }

  return (
    <Container data-testid="Login" maxWidth="sm" sx={{ my: 5 }}>
      <Card>
        <CardHeader title="ログイン" />
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
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
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              label="パスワード"
              error={!!passwordError}
              helperText={<span data-testid="loginPasswordErr">{passwordError}</span>}
              onKeyDown={onKeyDown}
              inputProps={{ "data-testid": "loginPassword" }}
            />
          </Box>
          <ErrTxt txt={apiError} testId="loginApiErr" />
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              setIsNew(true)
            }}
            data-testid="loginToNewUser"
          >
            新規登録画面へ
          </Button>
          <LoadingButton onClick={submit} loading={isLoading} data-testid="submitBtn" variant="contained">
            登録
          </LoadingButton>
        </CardActions>
      </Card>
    </Container>
  )
}
export default Login

import { AxiosError } from "axios"
import { SetStateAction } from "react"
export const errHandler = (
  err: AxiosError<{ errorMessage: string }>,
  setter: (value: SetStateAction<string>) => void
) => {
  const errorMessage = err?.response?.data?.errorMessage
  const errorStatusText = `${err?.response?.status}：${err?.response?.statusText}`
  setter(errorMessage ?? errorStatusText)
}

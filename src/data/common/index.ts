export const errHandler = (err: any, setter: any) => {
  const errorMessage = err?.response?.data?.errorMessage
  const errorStatusText = `${err?.response?.status}：${err?.response?.statusText}`
  setter(errorMessage ?? errorStatusText)
}

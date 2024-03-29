import "@testing-library/jest-dom"

import { act, renderHook } from "@testing-library/react"

import { myAxios } from "@/plugins/axios"
import { useBasicAuth } from "./"

const renderFunc = () => {
  return renderHook(() => useBasicAuth())
}
jest.mock("@/plugins/axios")
describe("useBasicAuth", () => {
  it("何も入力せずに登録した場合", async () => {
    const { result } = renderFunc()
    expect(result.current.emailError).toBe("")
    expect(result.current.passwordError).toBe("")
    await act(async () => {
      await result.current.basicAuth("", "")
    })
    expect(result.current.emailError).toBe("正しい形式で入力してください")
    expect(result.current.passwordError).toBe("パスワードは8桁以上です")
  })

  it("通信のテスト（成功）", async () => {
    const { result } = renderFunc()
    await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValue({ data: { token: "token123token123token123token123" } })
      await result.current.basicAuth("test@gmail.com", "password")
    })
    expect(localStorage.getItem("token")).toBe("token123token123token123token123")
    expect(result.current.basicAuthError).toBe("")
  })

  it("通信のテスト（失敗）", async () => {
    const { result } = renderFunc()
    await act(async () => {
      const axios: any = myAxios
      axios.mockRejectedValue({
        response: {
          status: 500,
          statusText: "Internal Server Error",
          data: { errorMessage: "パスワードが違います" }
        }
      })
      await result.current.basicAuth("test@gmail.com", "hogehoge")
    })
    expect(result.current.basicAuthError).toBe("パスワードが違います")
  })
})

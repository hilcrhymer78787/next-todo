import "@testing-library/jest-dom"

import { act, renderHook } from "@testing-library/react"

import { myAxios } from "@/plugins/axios"
import { useBasicAuth } from "./"

jest.mock("@/plugins/axios")
describe("useBasicAuth", () => {
  it("何も入力せずに登録した場合", async () => {
    const { result } = renderHook(() => useBasicAuth())
    expect(result.current.emailError).toBe("")
    expect(result.current.passwordError).toBe("")
    await act(async () => {
      await result.current.basicAuth("", "")
    })
    expect(result.current.emailError).toBe("正しい形式で入力してください")
    expect(result.current.passwordError).toBe("パスワードは8桁以上です")
  })

  it("通信のテスト（成功）", async () => {
    const { result } = renderHook(() => useBasicAuth())
    await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValue(null)
      await result.current.basicAuth("test@gmail.com", "password")
    })
    expect(result.current.basicAuthError).toBe("")
  })

  it("通信のテスト（失敗）", async () => {
    const { result } = renderHook(() => useBasicAuth())
    await act(async () => {
      const axios: any = myAxios
      axios.mockRejectedValue({
        response: {
          status: 500,
          statusText: "Internal Server Error",
          data: { errorMessage: "パスワードが違います" },
        }
      })
      await result.current.basicAuth("test@gmail.com", "hogehoge")
    })
    expect(result.current.basicAuthError).toBe("パスワードが違います")
  })
})

import "@testing-library/jest-dom"

import { act, renderHook } from "@testing-library/react"

import { myAxios } from "@/plugins/axios"
import { useCreateUser } from "./"

const renderFunc = () => {
  return renderHook(() => useCreateUser())
}
jest.mock("@/plugins/axios")
describe("useCreateUser", () => {
  it("何も入力せずに登録した場合", async () => {
    const { result } = renderFunc()
    expect(result.current.nameError).toBe("")
    expect(result.current.emailError).toBe("")
    expect(result.current.passwordError).toBe("")
    expect(result.current.createUserLoading).toBe(false)
    await act(async () => {
      await result.current.createUser("", "", "", "")
    })
    expect(result.current.nameError).toBe("名前は必須です")
    expect(result.current.emailError).toBe("正しい形式で入力してください")
    expect(result.current.passwordError).toBe("パスワードは8桁以上で設定してください")
    expect(result.current.createUserLoading).toBe(false)
  })

  it("通信のテスト（成功）", async () => {
    const { result } = renderFunc()
    await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValue({ data: { token: "token123token123token123token123" } })
      await result.current.createUser("John Doe", "john@example.com", "password123", "password123")
    })
    expect(localStorage.getItem("token")).toBe("token123token123token123token123")
    expect(result.current.nameError).toBe("")
    expect(result.current.emailError).toBe("")
    expect(result.current.passwordError).toBe("")
    expect(result.current.createUserError).toBe("")
  })

  it("通信のテスト（失敗）", async () => {
    const { result } = renderFunc()
    await act(async () => {
      const axios: any = myAxios
      axios.mockRejectedValue(new Error("Async error message"))
      await result.current.createUser("John Doe", "john@example.com", "password123", "password123")
    })
    expect(result.current.nameError).toBe("")
    expect(result.current.emailError).toBe("")
    expect(result.current.passwordError).toBe("")
    expect(result.current.createUserError).toBe("通信に失敗しました")
  })
})

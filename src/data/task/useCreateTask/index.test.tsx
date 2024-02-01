import "@testing-library/jest-dom"

import { act, renderHook } from "@testing-library/react"

import { myAxios } from "@/plugins/axios"
import { useCreateTask } from "./"

const renderFunc = () => {
  return renderHook(() => useCreateTask())
}
jest.mock("@/plugins/axios")
describe("useCreateTask", () => {
  it("名前が空白で登録した場合", async () => {
    const { result } = renderFunc()
    expect(result.current.nameError).toBe("")
    await act(async () => {
      await result.current.createTask("", false)
    })
    expect(result.current.nameError).toBe("名前は必須です")
    expect(result.current.createTaskLoading).toBe(false)
  })

  it("通信のテスト（成功）", async () => {
    const { result } = renderFunc()
    await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValue({ data: null })
      await result.current.createTask("掃除", false)
    })
    expect(result.current.nameError).toBe("")
    expect(result.current.createTaskError).toBe("")
  })

  it("通信のテスト（失敗）", async () => {
    const { result } = renderFunc()
    await act(async () => {
      const axios: any = myAxios
      axios.mockRejectedValue({
        response: {
          status: 500,
          statusText: "Internal Server Error",
          data: { errorMessage: "通信に失敗しました" }
        }
      })
      await result.current.createTask("掃除", false)
    })
    expect(result.current.nameError).toBe("")
    expect(result.current.createTaskError).toBe("通信に失敗しました")
  })
})

import "@testing-library/jest-dom"

import { act, renderHook } from "@testing-library/react"

import { RecoilRoot } from "recoil"
import { myAxios } from "@/plugins/axios"
import { useReadTask } from "./"
import { mockTasks } from "@/pages/api/task/readall"

const renderFunc = () => {
  return renderHook(() => useReadTask())
}
jest.mock("@/plugins/axios")
describe("useReadUser", () => {
  it("通信成功", async () => {
    const { result } = renderFunc()
    expect(result.current.task).toBe(null)
    await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValue({ data: mockTasks[0] })
      await result.current.readTask("1")
    })
    expect(result.current.readTaskError).toBe("")
    expect(result.current.task).toEqual(mockTasks[0])
  })

  it("通信失敗", async () => {
    const { result } = renderFunc()
    expect(result.current.task).toBe(null)
    await act(async () => {
      const axios: any = myAxios
      axios.mockRejectedValue({
        response: {
          status: 404,
          statusText: "Unauthorized",
          data: { errorMessage: "タスクが見つかりませんでした" }
        }
      })
      await result.current.readTask("1")
    })
    expect(result.current.readTaskError).toBe("タスクが見つかりませんでした")
    expect(result.current.task).toBe(null)
  })
})

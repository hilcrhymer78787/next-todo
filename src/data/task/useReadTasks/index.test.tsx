import "@testing-library/jest-dom"

import { act, renderHook } from "@testing-library/react"

import { myAxios } from "@/plugins/axios"
import { useReadTasks } from "./"
import { mockTasks } from "@/pages/api/task/readall"

const renderFunc = () => {
  return renderHook(() => useReadTasks())
}
jest.mock("@/plugins/axios")
describe("useReadUser", () => {
  it("通信成功", async () => {
    const { result } = renderFunc()
    expect(result.current.tasks).toBe(null)
    await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValue({ data: mockTasks })
      await result.current.readTasks()
    })
    expect(result.current.readTasksError).toBe("")
    expect(result.current.tasks).toEqual(mockTasks)
  })

  it("通信失敗", async () => {
    const { result } = renderFunc()
    expect(result.current.tasks).toBe(null)
    await act(async () => {
      const axios: any = myAxios
      axios.mockRejectedValue({
        response: {
          status: 404,
          statusText: "Unauthorized",
          data: { errorMessage: "通信に失敗しました" }
        }
      })
      await result.current.readTasks()
    })
    expect(result.current.readTasksError).toBe("通信に失敗しました")
    expect(result.current.tasks).toBe(null)
  })
})

import "@testing-library/jest-dom"

import { render, act } from "@testing-library/react"

import TaskReadContent from "./"
import { mockTasks } from "@/pages/api/task/readall"
import { RecoilRoot } from "recoil"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")
jest.mock("next/router", () => ({
  useRouter: () => {
    return {
      query: { taskId: "1" }
    }
  }
}))

const renderFunc = () => {
  return render(
    <RecoilRoot>
      <TaskReadContent />
    </RecoilRoot>
  )
}
describe("TaskReadContent", () => {
  test("タスクが表示される", async () => {
    const { getByText } = await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValueOnce({ data: mockTasks[0] })
      return renderFunc()
    })
    expect(getByText(mockTasks[0].id)).toBeInTheDocument()
    expect(getByText(mockTasks[0].name)).toBeInTheDocument()
  })

  test("「通信に失敗しました」が表示される", async () => {
    const { getByText } = await act(async () => {
      const axios: any = myAxios
      axios.mockRejectedValue({
        response: {
          status: 404,
          statusText: "Internal Server Error",
          data: { errorMessage: "タスクは見つかりませんでした" }
        }
      })
      return renderFunc()
    })
    expect(getByText("タスクは見つかりませんでした")).toBeInTheDocument()
  })
})

import "@testing-library/jest-dom"

import { fireEvent, render, act, screen } from "@testing-library/react"

import TasksContent from "./"
import { mockTasks } from "@/pages/api/task/readall"
import { useRouter } from "next/router"
import { RecoilRoot } from "recoil"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")
jest.mock("next/router", () => ({
  useRouter: jest.fn()
}))

const renderFunc = () => {
  return render(
    <RecoilRoot>
      <TasksContent />
    </RecoilRoot>
  )
}
describe("TasksContent", () => {
  test("「まだタスクはありません」が表示される", async () => {
    const { getByText } = await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValueOnce({ data: [] })
      return renderFunc()
    })
    expect(getByText("まだタスクはありません")).toBeInTheDocument()
  })

  test("「通信に失敗しました」が表示される", async () => {
    const { getByText } = await act(async () => {
      const axios: any = myAxios
      axios.mockRejectedValue({
        response: {
          status: 500,
          statusText: "Internal Server Error",
          data: { errorMessage: "通信に失敗しました" }
        }
      })
      return renderFunc()
    })
    expect(getByText("通信に失敗しました")).toBeInTheDocument()
  })

  test("タスク一覧が表示される", async () => {
    const { getByText } = await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValueOnce({ data: mockTasks })
      return renderFunc()
    })
    expect(getByText(mockTasks[0].name)).toBeInTheDocument()
  })
})

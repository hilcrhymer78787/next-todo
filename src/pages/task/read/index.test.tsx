import "@testing-library/jest-dom"

import { fireEvent, render, act, screen } from "@testing-library/react"

import TaskRead from "./"
import { mockTasks } from "@/pages/api/task/readall"
import { useRouter } from "next/router"
import { RecoilRoot } from "recoil"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")

const push = jest.fn()
jest.mock("next/router", () => ({
  useRouter: () => {
    return {
      query: { taskId: "1" },
      push
    }
  }
}))

const renderFunc = () => {
  return act(async () => {
    const axios: any = myAxios
    axios.mockResolvedValueOnce({ data: { name: "Yamada Tetsuto", email: "test@gmail.com" } })
    axios.mockResolvedValueOnce({ data: mockTasks[0] })
    return render(
      <RecoilRoot>
        <TaskRead />
      </RecoilRoot>
    )
  })
}
describe("TaskRead", () => {
  const { click } = fireEvent

  test("コンポーネントが表示される", async () => {
    const { getByTestId } = await renderFunc()
    expect(getByTestId("TaskRead")).toBeInTheDocument()
  })

  test("クリックしたらタスク追加ページへ遷移する", async () => {
    const { getByTestId } = await renderFunc()
    click(getByTestId("TaskReadReturnBtn"))
    expect(push).toHaveBeenCalledWith("/task")
  })
})

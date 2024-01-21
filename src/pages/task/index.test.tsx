import "@testing-library/jest-dom"

import { fireEvent, render, act, screen } from "@testing-library/react"

import Tasks from "./"
import { mockTasks } from "@/pages/api/task/readall"
import { useRouter } from "next/router"
import { RecoilRoot } from "recoil"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")
jest.mock("next/router", () => ({
  useRouter: jest.fn()
}))

const renderFunc = () => {
  return act(async () => {
    const axios: any = myAxios
    axios.mockResolvedValueOnce({ data: { name: "Yamada Tetsuto", email: "test@gmail.com" } })
    axios.mockResolvedValueOnce({ data: mockTasks })
    return render(
      <RecoilRoot>
        <Tasks />
      </RecoilRoot>
    )
  })
}
describe("Tasks", () => {
  const { click } = fireEvent

  test("タスク一覧が表示される", async () => {
    const { getByTestId } = await renderFunc()
    expect(getByTestId("Tasks")).toBeInTheDocument()
  })

  test("クリックしたらタスク追加ページへ遷移する", async () => {
    const pushMock = jest.fn()
    //@ts-ignore
    useRouter.mockReturnValue({
      push: pushMock
    })
    const { getByTestId } = await renderFunc()
    click(getByTestId("TasksAddBtn"))
    expect(pushMock).toHaveBeenCalledWith("/task/create")
  })
})

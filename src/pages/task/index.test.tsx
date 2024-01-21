import "@testing-library/jest-dom"

import { fireEvent, render, act } from "@testing-library/react"

import Tasks from "./"
import { mockTasks } from "@/pages/api/task/readall"
import { RecoilRoot } from "recoil"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")

const push = jest.fn()
jest.mock("next/router", () => ({
  useRouter: () => {
    return {
      push
    }
  }
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

  test("コンポーネントが表示される", async () => {
    const { getByTestId } = await renderFunc()
    expect(getByTestId("Tasks")).toBeInTheDocument()
  })

  test("クリックしたらタスク追加ページへ遷移する", async () => {
    const { getByTestId } = await renderFunc()
    click(getByTestId("TasksAddBtn"))
    expect(push).toHaveBeenCalledWith("/task/create")
  })
})

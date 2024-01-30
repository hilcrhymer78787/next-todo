import "@testing-library/jest-dom"

import { act, fireEvent, render } from "@testing-library/react"

import { RecoilRoot } from "recoil"
import TaskCreate from "./"
import { mockUser } from "@/pages/api/user/read"
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
    axios.mockResolvedValueOnce({ data: mockUser })
    return render(
      <RecoilRoot>
        <TaskCreate />
      </RecoilRoot>
    )
  })
}
describe("TaskCreate", () => {
  const { click } = fireEvent

  test("コンポーネントが表示される", async () => {
    const { getByTestId } = await renderFunc()
    expect(getByTestId("TaskCreate")).toBeInTheDocument()
  })

  // test("クリックしたらタスク追加ページへ遷移する", async () => {
  //   const { getByTestId } = await renderFunc()
  //   click(getByTestId("TaskCreateReturnBtn"))
  //   expect(push).toHaveBeenCalledWith("/task")
  // })
})

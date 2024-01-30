import "@testing-library/jest-dom"

import { act, fireEvent, render } from "@testing-library/react"

import { RecoilRoot } from "recoil"
import TaskUpdate from "./"
import { mockTasks } from "@/pages/api/task/readall"
import { mockUser } from "@/pages/api/user/read"
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
    axios.mockResolvedValueOnce({ data: mockUser })
    axios.mockResolvedValueOnce({ data: mockTasks[0] })
    return render(
      <RecoilRoot>
        <TaskUpdate />
      </RecoilRoot>
    )
  })
}
describe("TaskUpdate", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const { click, change } = fireEvent

  test("コンポーネントが表示される", async () => {
    const { getByTestId } = await renderFunc()
    expect(getByTestId("TaskUpdate")).toBeInTheDocument()
  })

  test("タスク一覧ページへ遷移", async () => {
    const { getByTestId } = await renderFunc()
    click(getByTestId("TaskUpdateReturnBtn"))
    expect(push).toHaveBeenCalledWith("/task")
  })

  test("空白でエラー", async () => {
    const { getByTestId } = await renderFunc()
    change(getByTestId("TaskUpdateName"), { target: { value: "" } })
    click(getByTestId("TaskUpdateSubmitBtn"))
    expect(getByTestId("TaskUpdateNameErr").innerHTML).toBe("名前は必須です")
  })

  test("登録失敗したら、エラーが表示される", async () => {
    const { getByTestId } = await renderFunc()
    change(getByTestId("TaskUpdateName"), { target: { value: "家計簿をつける" } })
    await act(async () => {
      const axios: any = myAxios
      axios.mockRejectedValue({
        response: {
          status: 500,
          statusText: "Internal Server Error",
          data: { errorMessage: "通信エラーです" }
        }
      })
      click(getByTestId("TaskUpdateSubmitBtn"))
    })
    expect(getByTestId("TaskUpdateErr").innerHTML).toBe("通信エラーです")
    expect(push).not.toHaveBeenCalled()
  })

  test("登録成功したら、タスク一覧ページへ遷移", async () => {
    const { getByTestId } = await renderFunc()
    change(getByTestId("TaskUpdateName"), { target: { value: "家計簿をつける" } })
    await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValue({ data: null })
      click(getByTestId("TaskUpdateSubmitBtn"))
    })
    expect(push).toHaveBeenCalledWith("/task")
  })
})

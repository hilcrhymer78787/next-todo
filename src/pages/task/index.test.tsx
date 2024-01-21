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
  return render(
    <RecoilRoot>
      <Tasks />
    </RecoilRoot>
  )
}
describe("Tasks", () => {
  test("タスク一覧が表示される", async () => {
    const { getByTestId, getByText } = await act(async() => {
      const axios: any = myAxios
      axios.mockResolvedValueOnce({ data: { name: "Yamada Tetsuto", email: "test@gmail.com" } })
      axios.mockResolvedValueOnce({ data: mockTasks })
      return renderFunc()
    })
    expect(getByTestId("Tasks")).toBeInTheDocument()
    expect(getByText("掃除")).toBeInTheDocument()
  })

  test("「まだタスクはありません」が表示される", async() => {
    const { getByText } = await act(async() => {
      const axios: any = myAxios
      axios.mockResolvedValueOnce({ data: { name: "Yamada Tetsuto", email: "test@gmail.com" } })
      axios.mockResolvedValueOnce({ data: [] })
      return renderFunc()
    })
    expect(getByText("まだタスクはありません")).toBeInTheDocument()
  })

  test("「通信に失敗しました」が表示される", async() => {
    const { getByText } = await act(async() => {
      const axios: any = myAxios
      axios.mockResolvedValueOnce({ data: { name: "Yamada Tetsuto", email: "test@gmail.com" } })
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

  // test('クリックしたらページ遷移する', () => {
  //   const pushMock = jest.fn()
  //   //@ts-ignore
  //   useRouter.mockReturnValue({
  //     push: pushMock,
  //   })
  //   const { getByTestId } = renderFunc()
  //   click(getByTestId('Tasks-0'));
  //   expect(pushMock).toHaveBeenCalledWith('/task/read?taskId=1');
  // });
})

import "@testing-library/jest-dom"

import { fireEvent, render, act, screen } from "@testing-library/react"

import Dashboard from "./"
import { mockTasks } from "@/pages/api/task/readall"
import { useRouter } from "next/router"
import { RecoilRoot } from "recoil"
import { myAxios } from "@/plugins/axios"
import { mockUser } from "@/pages/api/user/read"
import { useReadUser } from "@/data/user/useReadUser"
jest.mock("@/data/user/useReadUser")
jest.mock("next/router", () => ({
  useRouter: jest.fn()
}))

const renderFunc = () => {
  return act(async () => {
    //@ts-ignore
    useReadUser.mockReturnValue({ user: mockUser })
    return render(
      <RecoilRoot>
        <Dashboard>
          <div>this is test</div>
        </Dashboard>
      </RecoilRoot>
    )
  })
}

describe("Dashboard", () => {
  test("コンポーネントが表示される", async () => {
    const { getByTestId } = await renderFunc()
    expect(getByTestId("Dashboard")).toBeInTheDocument()
  })

  test("子要素が表示される", async () => {
    const { getByText } = await renderFunc()
    expect(getByText("this is test")).toBeInTheDocument()
  })

  // test("「通信に失敗しました」が表示される", async () => {
  //   const { getByText } = await act(async () => {
  //     const axios: any = myAxios
  //     axios.mockRejectedValue({
  //       response: {
  //         status: 500,
  //         statusText: "Internal Server Error",
  //         data: { errorMessage: "通信に失敗しました" }
  //       }
  //     })
  //     return renderFunc()
  //   })
  //   expect(getByText("通信に失敗しました")).toBeInTheDocument()
  // })

  // test("タスク一覧が表示される", async () => {
  //   const { getByText } = await act(async () => {
  //     const axios: any = myAxios
  //     axios.mockResolvedValueOnce({ data: mockTasks })
  //     return renderFunc()
  //   })
  //   expect(getByText(mockTasks[0].name)).toBeInTheDocument()
  // })
})

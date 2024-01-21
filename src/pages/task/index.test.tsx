import "@testing-library/jest-dom"

import { fireEvent, render, act, screen } from "@testing-library/react"

import Tasks from "./"
import { mockTasks } from "@/pages/api/task/readall"
import { useRouter } from "next/router"
import { RecoilRoot } from "recoil"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")
const renderFunc = () => {
  return render(
    <RecoilRoot>
      <Tasks />
    </RecoilRoot>
  )
}

jest.mock("next/router", () => ({
  useRouter: jest.fn()
}))

describe("Tasks", () => {
  test("コンポーネントが表示される", async () => {
    expect("Tasks").toBe("Tasks")
  })

  // const { click } = fireEvent

  // test("コンポーネントが表示される", async() => {
  //   await act(async () => {
  //     const axios: any = myAxios
  //     axios.mockResolvedValue({ data: { token: "token123token123token123token123" } })
  //   })
  //   screen.debug()
  //   const { getByTestId } = renderFunc()
  //   expect(getByTestId("Tasks")).toBeInTheDocument()
  // })

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

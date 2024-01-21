import "@testing-library/jest-dom"

import { fireEvent, render,act ,screen} from "@testing-library/react"

import AuthLayout from "./"
import {useRouter} from "next/router"
import { RecoilRoot } from "recoil"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")
const renderFunc = () => {
  return render(
    <RecoilRoot>
      <AuthLayout>
        this is test
      </AuthLayout>
    </RecoilRoot>
  )
}

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe("AuthLayout", () => {
  test("ユーザー情報が取得できたらコンポーネントが表示される", async() => {
    const {getByText} = await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValue({ data: { name: "Yamada Tetsuto", email: "test@gmail.com" } })
      return renderFunc()
    })
    expect(getByText("this is test")).toBeInTheDocument()
  })

  // const { click } = fireEvent

  // test("コンポーネントが表示される", async() => {
  //   await act(async () => {
  //     const axios: any = myAxios
  //     axios.mockResolvedValue({ data: { token: "token123token123token123token123" } })
  //   })
  //   screen.debug()
  //   const { getByTestId } = renderFunc()
  //   expect(getByTestId("AuthLayout")).toBeInTheDocument()
  // })

  // test('クリックしたらページ遷移する', () => {
  //   const pushMock = jest.fn()
  //   //@ts-ignore
  //   useRouter.mockReturnValue({
  //     push: pushMock,
  //   })
  //   const { getByTestId } = renderFunc()
  //   click(getByTestId('AuthLayout-0'));  
  //   expect(pushMock).toHaveBeenCalledWith('/task/read?taskId=1');
  // });
})

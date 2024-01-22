import "@testing-library/jest-dom"

import { act, render } from "@testing-library/react"

import AuthLayout from "./"
import { RecoilRoot } from "recoil"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")
jest.mock("next/router", () => ({
  useRouter: jest.fn()
}))
const renderFunc = () => {
  return render(
    <RecoilRoot>
      <AuthLayout>this is test</AuthLayout>
    </RecoilRoot>
  )
}

describe("AuthLayout", () => {
  test("ユーザー情報が取得できたらコンポーネントが表示される", async () => {
    const { getByText } = await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValue({ data: { name: "Yamada Tetsuto", email: "test@gmail.com" } })
      return renderFunc()
    })
    expect(getByText("this is test")).toBeInTheDocument()
  })
  test("ユーザー情報が取得できなければログイン画面が表示される", async () => {
    const { getByTestId } = await act(async () => {
      const axios: any = myAxios
      axios.mockRejectedValue({
        response: {
          status: 401,
          statusText: "Unauthorized",
          data: { errorMessage: "トークンが有効ではありません" }
        }
      })
      return renderFunc()
    })
    expect(getByTestId("Login")).toBeInTheDocument()
  })
})

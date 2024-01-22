import "@testing-library/jest-dom"

import { act, fireEvent, render } from "@testing-library/react"

import Mypage from "./"
import { RecoilRoot } from "recoil"
import { mock } from "node:test"
import { mockUser } from "@/pages/api/user/read"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")
jest.mock("next/router", () => ({
  useRouter: jest.fn()
}))

const renderFunc = () => {
  return act(async () => {
    const axios: any = myAxios
    await axios.mockResolvedValueOnce({ data: mockUser })
    return render(
      <RecoilRoot>
        <Mypage />
      </RecoilRoot>
    )
  })
}
describe("Mypage", () => {
  test("コンポーネントが表示される", async () => {
    const { getByTestId } = await renderFunc()
    expect(getByTestId("Mypage")).toBeInTheDocument()
  })

  test("ユーザーの情報が表示される", async () => {
    const { getByTestId } = await renderFunc()
    expect(getByTestId("MypageName").innerHTML).toBe(mockUser.name)
    expect(getByTestId("MypageEmail").innerHTML).toBe(mockUser.email)
  })
})

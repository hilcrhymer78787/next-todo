import "@testing-library/jest-dom"

import { fireEvent, render } from "@testing-library/react"

import Auth from "./"
import { RecoilRoot } from "recoil"

jest.mock("@/plugins/axios")

const renderFunc = () => {
  return render(
    <RecoilRoot>
      <Auth />
    </RecoilRoot>
  )
}

describe("TalkRoomListItem", () => {
  const { click } = fireEvent
  it("画面切り替えが可能", () => {
    //ログイン画面
    const { getByTestId } = renderFunc()
    expect(getByTestId("Login")).toBeInTheDocument()

    // 新規登録画面へ切り替え
    click(getByTestId("loginToNewUser"))
    expect(getByTestId("NewUser")).toBeInTheDocument()

    // ログイン画面へ切り替え
    click(getByTestId("NewUserToLogin"))
    expect(getByTestId("Login")).toBeInTheDocument()
  })
})

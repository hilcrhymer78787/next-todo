import "@testing-library/jest-dom"

import { render, act } from "@testing-library/react"

import Dashboard from "./"
import { RecoilRoot } from "recoil"
import { mockUser } from "@/pages/api/user/read"
jest.mock("@/data/user/useReadUser", () => ({
  useReadUser: () => {
    return { user: mockUser }
  }
}))
jest.mock("next/router", () => ({
  useRouter: jest.fn()
}))

const renderFunc = () => {
  return act(async () => {
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

  test("ユーザー名が表示される", async () => {
    const { getByText } = await renderFunc()
    expect(getByText(mockUser.name)).toBeInTheDocument()
  })
})

import "@testing-library/jest-dom"

import { act, fireEvent, render } from "@testing-library/react"

import NavItem from "./"
import { RecoilRoot } from "recoil"
import { mockTasks } from "@/pages/api/task/readall"
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

const mockNav = {
  ttl: "テストタイトル",
  icon: <div data-testid="mockNavIcon">icon</div>,
  path: "/test"
}

const renderFunc = () => {
  return act(async () => {
    const axios: any = myAxios
    axios.mockResolvedValueOnce({ data: mockUser })
    axios.mockResolvedValueOnce({ data: mockTasks[0] })
    return render(
      <RecoilRoot>
        <NavItem nav={mockNav} i={0} />
      </RecoilRoot>
    )
  })
}
describe("NavItem", () => {
  const { click } = fireEvent

  test("コンポーネントが表示される", async () => {
    const { getByTestId } = await renderFunc()
    expect(getByTestId("NavItem-0")).toBeInTheDocument()
  })

  test("タイトルが表示される", async () => {
    const { getByText } = await renderFunc()
    expect(getByText(mockNav.ttl)).toBeInTheDocument()
  })

  test("アイコンが表示される", async () => {
    const { getByTestId } = await renderFunc()
    expect(getByTestId("mockNavIcon")).toBeInTheDocument()
  })

  test("クリックしたらページ遷移", async () => {
    const { getByTestId } = await renderFunc()
    click(getByTestId("NavItem-0"))
    expect(push).toHaveBeenCalledWith(mockNav.path)
  })
})

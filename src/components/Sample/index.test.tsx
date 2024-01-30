import "@testing-library/jest-dom"

import Sample from "./"
import { render } from "@testing-library/react"

jest.mock("@/plugins/axios")
const renderFunc = () => {
  return render(<Sample />)
}
describe("AuthLayout", () => {
  test("コンポーネントが表示される", async () => {
    const { getByText } = renderFunc()
    expect(getByText("this is Sample")).toBeInTheDocument()
  })
  test("demmy", async () => {
    expect("dummy").toBe("dummy")
  })
})

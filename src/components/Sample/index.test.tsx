import "@testing-library/jest-dom"

import { render} from "@testing-library/react"

import Sample from "./"

jest.mock("@/plugins/axios")
const renderFunc = () => {
  return render(
      <Sample/>
  )
}
describe("AuthLayout", () => {
  test("コンポーネントが表示される", async() => {
    const {getByText}=renderFunc()
    expect(getByText("this is sample")).toBeInTheDocument()
  })
  test("demmy", async() => {
    expect("dummy").toBe("dummy")
  })
})

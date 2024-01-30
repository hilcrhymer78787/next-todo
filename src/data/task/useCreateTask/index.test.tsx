import "@testing-library/jest-dom"

// import TaskCreateContent from "./"
import { render } from "@testing-library/react"

jest.mock("@/plugins/axios")
// const renderFunc = () => {
//   return render(<TaskCreateContent />)
// }
describe("AuthLayout", () => {
  // test("コンポーネントが表示される", async () => {
  //   const { getByText } = renderFunc()
  //   expect(getByText("this is TaskCreateContent")).toBeInTheDocument()
  // })
  test("demmy", async () => {
    expect("dummy").toBe("dummy")
  })
})

import "@testing-library/jest-dom"

// import TaskEdit from "./"
import { render } from "@testing-library/react"

jest.mock("@/plugins/axios")
// const renderFunc = () => {
//   return render(<TaskEdit />)
// }
describe("AuthLayout", () => {
  // test("コンポーネントが表示される", async () => {
  //   const { getByText } = renderFunc()
  //   expect(getByText("this is TaskEdit")).toBeInTheDocument()
  // })
  test("demmy", async () => {
    expect("dummy").toBe("dummy")
  })
})

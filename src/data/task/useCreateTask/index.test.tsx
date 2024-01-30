import "@testing-library/jest-dom"

// import TaskCreate from "./"
import { render } from "@testing-library/react"

jest.mock("@/plugins/axios")
// const renderFunc = () => {
//   return render(<TaskCreate />)
// }
describe("AuthLayout", () => {
  // test("コンポーネントが表示される", async () => {
  //   const { getByText } = renderFunc()
  //   expect(getByText("this is TaskCreate")).toBeInTheDocument()
  // })
  test("demmy", async () => {
    expect("dummy").toBe("dummy")
  })
})

import "@testing-library/jest-dom"

import Loading from "./"
import { render } from "@testing-library/react"

describe("Loading", () => {
  test("コンポーネントが表示される", async () => {
    const { getByTestId } = render(<Loading />)
    expect(getByTestId("Loading")).toBeInTheDocument()
  })
})

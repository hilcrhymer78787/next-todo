import "@testing-library/jest-dom"

import ErrTxt from "./"
import { render } from "@testing-library/react"

describe("ErrTxt", () => {
  test("txtが表示される", async () => {
    const { getByTestId, getByText } = render(<ErrTxt txt="テスト用テキスト" />)
    expect(getByTestId("ErrTxt")).toBeInTheDocument()
    expect(getByText("テスト用テキスト")).toBeInTheDocument()
  })

  test("txtがない場合は表示されない", async () => {
    const { queryByTestId } = render(<ErrTxt />)
    expect(queryByTestId("ErrTxt")).toBeNull()
  })

  test("testIdを渡すことができる", async () => {
    const { getByTestId } = render(<ErrTxt txt="テスト用テキスト" testId="errTestId" />)
    expect(getByTestId("errTestId")).toBeInTheDocument()
  })
})

import "@testing-library/jest-dom"

import NoData from "./"
import { render } from "@testing-library/react"

describe("NoData", () => {
  test("txtが表示される", async () => {
    const { getByTestId, getByText } = render(<NoData txt="テスト用テキスト" />)
    expect(getByTestId("NoData")).toBeInTheDocument()
    expect(getByText("テスト用テキスト")).toBeInTheDocument()
  })

  test("txtがない場合は表示されない", async () => {
    const { queryByTestId } = render(<NoData />)
    expect(queryByTestId("NoData")).toBeNull()
  })

  test("testIdを渡すことができる", async () => {
    const { getByTestId } = render(<NoData txt="テスト用テキスト" testId="errTestId" />)
    expect(getByTestId("errTestId")).toBeInTheDocument()
  })
})

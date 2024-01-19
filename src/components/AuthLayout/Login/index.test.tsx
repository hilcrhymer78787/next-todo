import "@testing-library/jest-dom"

import { act, renderHook, waitFor } from "@testing-library/react"
import { fireEvent, render, screen } from "@testing-library/react"

import Login from "./"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")

describe("TalkRoomListItem", () => {
  it("コンポーネントが表示される", () => {
    const { getByTestId } = render(<Login setIsNew={jest.fn()} />)
    expect(getByTestId("Login")).toBeInTheDocument()
  })

  describe("loginEmail", () => {
    test("空白でエラー", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()} />)
      const { click } = fireEvent
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginEmailErr").innerHTML).toBe("正しい形式で入力してください")
    })
    test("正しくない形式でエラー", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("loginEmail"), { target: { value: "hogehoge" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginEmailErr").innerHTML).toBe("正しい形式で入力してください")
    })
    test("正しく入力されたらエラーは非表示", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("loginEmail"), { target: { value: "hogehoge@gmail.com" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginEmailErr").innerHTML).toBe("")
    })
  })

  describe("loginPassword", () => {
    test("空白でエラー", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()} />)
      const { click } = fireEvent
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginPasswordErr").innerHTML).toBe("パスワードは8桁以上です")
    })
    test("文字数不足でエラー", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("loginPassword"), { target: { value: "hoge" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginPasswordErr").innerHTML).toBe("パスワードは8桁以上です")
    })
    test("正しく入力されたらエラーは非表示", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("loginPassword"), { target: { value: "hogehogehoge" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginPasswordErr").innerHTML).toBe("")
    })
  })

  describe("api test", () => {
    it("通信のテスト（成功）", async () => {
      const { getByTestId, queryByTestId } = render(<Login setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("loginEmail"), { target: { value: "test@gmail.com" } })
      change(getByTestId("loginPassword"), { target: { value: "password" } })
      await act(async () => {
        const axios: any = myAxios
        axios.mockResolvedValue({ token: "token123token123token123token123" })
        click(getByTestId("submitBtn"))
      })
      expect(queryByTestId("loginApiErr")).toBeNull()
    })

    it("通信のテスト（失敗）", async () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("loginEmail"), { target: { value: "test@gmail.com" } })
      change(getByTestId("loginPassword"), { target: { value: "password" } })
      await act(async () => {
        const axios: any = myAxios
        axios.mockRejectedValue({
          response: {
            status: 500,
            statusText: "Internal Server Error",
            data: { errorMessage: "パスワードが違います" },
          }
        })
        click(getByTestId("submitBtn"))
      })
      expect(getByTestId("loginApiErr").innerHTML).toBe("パスワードが違います")
    })
  })
})

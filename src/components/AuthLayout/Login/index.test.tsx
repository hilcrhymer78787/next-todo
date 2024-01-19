import "@testing-library/jest-dom"

import { act, renderHook, waitFor } from "@testing-library/react"
import { fireEvent, render, screen } from "@testing-library/react"

import Login from "./"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")

describe("TalkRoomListItem", () => {
  it("コンポーネントが表示される", () => {
    render(<Login setIsNew={jest.fn()}/>)
    const component = screen.getByTestId("Login")
    expect(component).toBeInTheDocument()
  })

  describe("loginName", () => {
    test("何もない状態で「登録」を押されたらエラー", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { click } = fireEvent
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginNameErr").innerHTML).toBe("名前は必須です")
    })
    test("「名前」で値が正しく入力されるか確認", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { change } = fireEvent
      change(getByTestId("loginName"), { target: { value: "Yamada Tetsuto" } })
      //@ts-ignore
      expect(getByTestId("loginName").value).toBe("Yamada Tetsuto")
    })
    test("「名前」を入力して「登録」を押されたらエラーは表示されない", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { change, click } = fireEvent
      change(getByTestId("loginName"), { target: { value: "Yamada Tetsuto" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginNameErr").innerHTML).toBe("")
    })
  })

  describe("loginEmail", () => {
    test("空白でエラー", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { click } = fireEvent
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginEmailErr").innerHTML).toBe("正しい形式で入力してください")
    })
    test("正しくない形式でエラー", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { change, click } = fireEvent
      change(getByTestId("loginEmail"), { target: { value: "hogehoge" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginEmailErr").innerHTML).toBe("正しい形式で入力してください")
    })
    test("正しく入力されたらエラーは非表示", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { change, click } = fireEvent
      change(getByTestId("loginEmail"), { target: { value: "hogehoge@gmail.com" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginEmailErr").innerHTML).toBe("")
    })
  })

  describe("loginPassword", () => {
    test("空白でエラー", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { click } = fireEvent
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginPasswordErr").innerHTML).toBe("パスワードは8桁以上で設定してください")
    })
    test("文字数不足でエラー", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { change, click } = fireEvent
      change(getByTestId("loginPassword"), { target: { value: "hoge" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginPasswordErr").innerHTML).toBe("パスワードは8桁以上で設定してください")
    })
    test("「パスワード確認」が正しくなければエラー", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { change, click } = fireEvent
      const loginPasswordConfirm = getByTestId("loginPasswordConfirm")
      change(getByTestId("loginPassword"), { target: { value: "hogehoge" } })
      change(loginPasswordConfirm, { target: { value: "fugafuga" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginPasswordErr").innerHTML).toBe("パスワードが一致しません")
    })
    test("正しく入力されたらエラーは非表示", () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { change, click } = fireEvent
      const loginPasswordConfirm = getByTestId("loginPasswordConfirm")
      change(getByTestId("loginPassword"), { target: { value: "hogehogehoge" } })
      change(loginPasswordConfirm, { target: { value: "hogehogehoge" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("loginPasswordErr").innerHTML).toBe("")
    })
  })

  describe("api test", () => {
    it("通信のテスト（成功）", async () => {
      const { getByTestId, queryByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { change, click } = fireEvent
      change(getByTestId("loginName"), { target: { value: "Yamada Tetsuto" } })
      change(getByTestId("loginEmail"), { target: { value: "hogehoge@gmail.com" } })
      change(getByTestId("loginPassword"), { target: { value: "hogehoge" } })
      change(getByTestId("loginPasswordConfirm"), { target: { value: "hogehoge" } })
      await act(async () => {
        ;(myAxios as any).mockResolvedValue(null)
        click(getByTestId("submitBtn"))
      })
      expect(queryByTestId("loginApiErr")).toBeNull()
    })

    it("通信のテスト（失敗）", async () => {
      const { getByTestId } = render(<Login setIsNew={jest.fn()}/>)
      const { change, click } = fireEvent
      change(getByTestId("loginName"), { target: { value: "Yamada Tetsuto" } })
      change(getByTestId("loginEmail"), { target: { value: "hogehoge@gmail.com" } })
      change(getByTestId("loginPassword"), { target: { value: "hogehoge" } })
      change(getByTestId("loginPasswordConfirm"), { target: { value: "hogehoge" } })
      await act(async () => {
        ;(myAxios as any).mockRejectedValue(new Error("Async error message"))
        click(getByTestId("submitBtn"))
      })
      expect(getByTestId("loginApiErr").innerHTML).toBe("通信に失敗しました")
    })
  })
})

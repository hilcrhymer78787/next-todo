import "@testing-library/jest-dom"

import { act, renderHook, waitFor } from "@testing-library/react"
import { fireEvent, render, screen } from "@testing-library/react"

import Login from "./"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")

describe("TalkRoomListItem", () => {
  it("コンポーネントが表示される", () => {
    render(<Login />)
    const component = screen.getByTestId("Login")
    expect(component).toBeInTheDocument()
  })

  describe("loginName", () => {
    test("何もない状態で「登録」を押されたらエラー", () => {
      const { getByTestId } = render(<Login />)
      const { click } = fireEvent
      const submitBtn = getByTestId("submitBtn")
      const loginNameErr = getByTestId("loginNameErr")
      click(submitBtn)
      expect(loginNameErr.innerHTML).toBe("名前は必須です")
    })
    test("「名前」で値が正しく入力されるか確認", () => {
      const { getByTestId } = render(<Login />)
      const { change } = fireEvent

      const loginName = getByTestId("loginName")
      change(loginName, { target: { value: "Yamada Tetsuto" } })
      //@ts-ignore
      expect(loginName.value).toBe("Yamada Tetsuto")
    })
    test("「名前」を入力して「登録」を押されたらエラーは表示されない", () => {
      const { getByTestId } = render(<Login />)
      const { change, click } = fireEvent
      const submitBtn = getByTestId("submitBtn")
      const loginName = getByTestId("loginName")
      const loginNameErr = getByTestId("loginNameErr")
      change(loginName, { target: { value: "Yamada Tetsuto" } })
      click(submitBtn)
      expect(loginNameErr.innerHTML).toBe("")
    })
  })

  describe("loginEmail", () => {
    test("空白でエラー", () => {
      const { getByTestId } = render(<Login />)
      const { click } = fireEvent

      const submitBtn = getByTestId("submitBtn")
      const loginEmailErr = getByTestId("loginEmailErr")
      click(submitBtn)
      expect(loginEmailErr.innerHTML).toBe("正しい形式で入力してください")
    })
    test("正しくない形式でエラー", () => {
      const { getByTestId } = render(<Login />)
      const { change, click } = fireEvent

      const submitBtn = getByTestId("submitBtn")
      const loginEmail = getByTestId("loginEmail")
      const loginEmailErr = getByTestId("loginEmailErr")
      change(loginEmail, { target: { value: "hogehoge" } })
      click(submitBtn)
      expect(loginEmailErr.innerHTML).toBe("正しい形式で入力してください")
    })
    test("正しく入力されたらエラーは非表示", () => {
      const { getByTestId } = render(<Login />)
      const { change, click } = fireEvent
      const submitBtn = getByTestId("submitBtn")
      const loginEmail = getByTestId("loginEmail")
      const loginEmailErr = getByTestId("loginEmailErr")
      change(loginEmail, { target: { value: "hogehoge@gmail.com" } })
      click(submitBtn)
      expect(loginEmailErr.innerHTML).toBe("")
    })
  })

  describe("loginPassword", () => {
    test("空白でエラー", () => {
      const { getByTestId } = render(<Login />)
      const { click } = fireEvent

      const submitBtn = getByTestId("submitBtn")
      const loginPasswordErr = getByTestId("loginPasswordErr")
      click(submitBtn)
      expect(loginPasswordErr.innerHTML).toBe("パスワードは8桁以上で設定してください")
    })
    test("文字数不足でエラー", () => {
      const { getByTestId } = render(<Login />)
      const { change, click } = fireEvent

      const submitBtn = getByTestId("submitBtn")
      const loginPassword = getByTestId("loginPassword")
      const loginPasswordErr = getByTestId("loginPasswordErr")
      change(loginPassword, { target: { value: "hoge" } })
      click(submitBtn)
      expect(loginPasswordErr.innerHTML).toBe("パスワードは8桁以上で設定してください")
    })
    test("「パスワード確認」が正しくなければエラー", () => {
      const { getByTestId } = render(<Login />)
      const { change, click } = fireEvent

      const submitBtn = getByTestId("submitBtn")
      const loginPassword = getByTestId("loginPassword")
      const loginPasswordConfirm = getByTestId("loginPasswordConfirm")
      const loginPasswordErr = getByTestId("loginPasswordErr")
      change(loginPassword, { target: { value: "hogehoge" } })
      change(loginPasswordConfirm, { target: { value: "fugafuga" } })
      click(submitBtn)
      expect(loginPasswordErr.innerHTML).toBe("パスワードが一致しません")
    })
    test("正しく入力されたらエラーは非表示", () => {
      const { getByTestId } = render(<Login />)
      const { change, click } = fireEvent
      const submitBtn = getByTestId("submitBtn")
      const loginPassword = getByTestId("loginPassword")
      const loginPasswordConfirm = getByTestId("loginPasswordConfirm")
      const loginPasswordErr = getByTestId("loginPasswordErr")
      change(loginPassword, { target: { value: "hogehogehoge" } })
      change(loginPasswordConfirm, { target: { value: "hogehogehoge" } })
      click(submitBtn)
      expect(loginPasswordErr.innerHTML).toBe("")
    })
  })

  describe("api test", () => {
    it("通信のテスト（成功）", async () => {
      const { getByTestId, queryByTestId } = render(<Login />)
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
      const { getByTestId } = render(<Login />)
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

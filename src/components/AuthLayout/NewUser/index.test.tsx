import "@testing-library/jest-dom"

import { fireEvent, render } from "@testing-library/react"

import NewUser from "./"
import { act } from "@testing-library/react"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")

describe("TalkRoomListItem", () => {
  it("コンポーネントが表示される", () => {
    const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
    expect(getByTestId("NewUser")).toBeInTheDocument()
  })

  describe("NewUserName", () => {
    test("何もない状態で「登録」を押されたらエラー", () => {
      const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { click } = fireEvent
      click(getByTestId("submitBtn"))
      expect(getByTestId("NewUserNameErr").innerHTML).toBe("名前は必須です")
    })
    test("「名前」で値が正しく入力されるか確認", () => {
      const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { change } = fireEvent
      change(getByTestId("NewUserName"), { target: { value: "Yamada Tetsuto" } })
      //@ts-ignore
      expect(getByTestId("NewUserName").value).toBe("Yamada Tetsuto")
    })
    test("「名前」を入力して「登録」を押されたらエラーは表示されない", () => {
      const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("NewUserName"), { target: { value: "Yamada Tetsuto" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("NewUserNameErr").innerHTML).toBe("")
    })
  })

  describe("NewUserEmail", () => {
    test("空白でエラー", () => {
      const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { click } = fireEvent
      click(getByTestId("submitBtn"))
      expect(getByTestId("NewUserEmailErr").innerHTML).toBe("正しい形式で入力してください")
    })
    test("正しくない形式でエラー", () => {
      const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("NewUserEmail"), { target: { value: "hogehoge" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("NewUserEmailErr").innerHTML).toBe("正しい形式で入力してください")
    })
    test("正しく入力されたらエラーは非表示", () => {
      const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("NewUserEmail"), { target: { value: "hogehoge@gmail.com" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("NewUserEmailErr").innerHTML).toBe("")
    })
  })

  describe("NewUserPassword", () => {
    test("空白でエラー", () => {
      const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { click } = fireEvent
      click(getByTestId("submitBtn"))
      expect(getByTestId("NewUserPasswordErr").innerHTML).toBe("パスワードは8桁以上で設定してください")
    })
    test("文字数不足でエラー", () => {
      const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("NewUserPassword"), { target: { value: "hoge" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("NewUserPasswordErr").innerHTML).toBe("パスワードは8桁以上で設定してください")
    })
    test("「パスワード確認」が正しくなければエラー", () => {
      const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      const NewUserPasswordConfirm = getByTestId("NewUserPasswordConfirm")
      change(getByTestId("NewUserPassword"), { target: { value: "hogehoge" } })
      change(NewUserPasswordConfirm, { target: { value: "fugafuga" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("NewUserPasswordErr").innerHTML).toBe("パスワードが一致しません")
    })
    test("正しく入力されたらエラーは非表示", () => {
      const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      const NewUserPasswordConfirm = getByTestId("NewUserPasswordConfirm")
      change(getByTestId("NewUserPassword"), { target: { value: "hogehogehoge" } })
      change(NewUserPasswordConfirm, { target: { value: "hogehogehoge" } })
      click(getByTestId("submitBtn"))
      expect(getByTestId("NewUserPasswordErr").innerHTML).toBe("")
    })
  })

  describe("api test", () => {
    it("通信のテスト（成功）", async () => {
      const { getByTestId, queryByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("NewUserName"), { target: { value: "Yamada Tetsuto" } })
      change(getByTestId("NewUserEmail"), { target: { value: "hogehoge@gmail.com" } })
      change(getByTestId("NewUserPassword"), { target: { value: "hogehoge" } })
      change(getByTestId("NewUserPasswordConfirm"), { target: { value: "hogehoge" } })
      await act(async () => {
        ;(myAxios as any).mockResolvedValue(null)
        click(getByTestId("submitBtn"))
      })
      expect(queryByTestId("NewUserApiErr")).toBeNull()
    })

    it("通信のテスト（失敗）", async () => {
      const { getByTestId } = render(<NewUser setIsNew={jest.fn()} />)
      const { change, click } = fireEvent
      change(getByTestId("NewUserName"), { target: { value: "Yamada Tetsuto" } })
      change(getByTestId("NewUserEmail"), { target: { value: "hogehoge@gmail.com" } })
      change(getByTestId("NewUserPassword"), { target: { value: "hogehoge" } })
      change(getByTestId("NewUserPasswordConfirm"), { target: { value: "hogehoge" } })
      await act(async () => {
        ;(myAxios as any).mockRejectedValue(new Error("Async error message"))
        click(getByTestId("submitBtn"))
      })
      expect(getByTestId("NewUserApiErr").innerHTML).toBe("通信に失敗しました")
    })
  })
})

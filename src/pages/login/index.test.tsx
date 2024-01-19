import "@testing-library/jest-dom"

import { fireEvent, render, screen } from "@testing-library/react"

import Login from "./"

describe("TalkRoomListItem", () => {
  it("コンポーネントが表示される", () => {
    render(<Login />)
    const component = screen.getByTestId("Login")
    expect(component).toBeInTheDocument()
  })

  describe("loginName", () => {
    test('何もない状態で「登録」を押されたらエラー', () => {
      const { getByTestId } = render(<Login />);
      const submitBtn = getByTestId('submitBtn');
      const loginNameErr = getByTestId('loginNameErr');
      fireEvent.click(submitBtn)
      expect(loginNameErr.innerHTML).toBe('名前は必須です');
    });
    test('「名前」で値が正しく入力されるか確認', () => {
      const { getByTestId } = render(<Login />);
      const loginName = getByTestId('loginName');
      fireEvent.change(loginName, { target: { value: 'Yamada Tetsuto' } });
      //@ts-ignore
      expect(loginName.value).toBe('Yamada Tetsuto');
    });
    test('「名前」を入力して「登録」を押されたらエラーは表示されない', () => {
      const { getByTestId } = render(<Login />);
      const submitBtn = getByTestId('submitBtn');
      const loginName = getByTestId('loginName');
      const loginNameErr = getByTestId('loginNameErr');
      fireEvent.change(loginName, { target: { value: 'Yamada Tetsuto' } });
      fireEvent.click(submitBtn)
      expect(loginNameErr.innerHTML).toBe('');
    });
  })

  describe("loginEmail", () => {
    test('空白でエラー', () => {
      const { getByTestId } = render(<Login />);
      const submitBtn = getByTestId('submitBtn');
      const loginEmailErr = getByTestId('loginEmailErr');
      fireEvent.click(submitBtn)
      expect(loginEmailErr.innerHTML).toBe('正しい形式で入力してください');
    });
    test('正しくない形式でエラー', () => {
      const { getByTestId } = render(<Login />);
      const submitBtn = getByTestId('submitBtn');
      const loginEmail = getByTestId('loginEmail');
      const loginEmailErr = getByTestId('loginEmailErr');
      fireEvent.change(loginEmail, { target: { value: 'hogehoge' } });
      fireEvent.click(submitBtn)
      expect(loginEmailErr.innerHTML).toBe('正しい形式で入力してください');
    });
    test('正しく入力されたらエラーは非表示', () => {
      const { getByTestId } = render(<Login />);
      const submitBtn = getByTestId('submitBtn');
      const loginEmail = getByTestId('loginEmail');
      const loginEmailErr = getByTestId('loginEmailErr');
      fireEvent.change(loginEmail, { target: { value: 'hogehoge@gmail.com' } });
      fireEvent.click(submitBtn)
      expect(loginEmailErr.innerHTML).toBe('');
    });
  })

  describe("loginPassword", () => {
    test('空白でエラー', () => {
      const { getByTestId } = render(<Login />);
      const submitBtn = getByTestId('submitBtn');
      const loginPasswordErr = getByTestId('loginPasswordErr');
      fireEvent.click(submitBtn)
      expect(loginPasswordErr.innerHTML).toBe('パスワードは8桁以上で設定してください');
    });
    test('文字数不足でエラー', () => {
      const { getByTestId } = render(<Login />);
      const submitBtn = getByTestId('submitBtn');
      const loginPassword = getByTestId('loginPassword');
      const loginPasswordErr = getByTestId('loginPasswordErr');
      fireEvent.change(loginPassword, { target: { value: 'hoge' } });
      fireEvent.click(submitBtn)
      expect(loginPasswordErr.innerHTML).toBe('パスワードは8桁以上で設定してください');
    });
    test('「パスワード確認」が正しくなければエラー', () => {
      const { getByTestId } = render(<Login />);
      const submitBtn = getByTestId('submitBtn');
      const loginPassword = getByTestId('loginPassword');
      const loginPasswordConfirm = getByTestId('loginPasswordConfirm');
      const loginPasswordErr = getByTestId('loginPasswordErr');
      fireEvent.change(loginPassword, { target: { value: 'hogehoge' } });
      fireEvent.change(loginPasswordConfirm, { target: { value: 'fugafuga' } });
      fireEvent.click(submitBtn)
      expect(loginPasswordErr.innerHTML).toBe('パスワードが一致しません');
    });
    test('正しく入力されたらエラーは非表示', () => {
      const { getByTestId } = render(<Login />);
      const submitBtn = getByTestId('submitBtn');
      const loginPassword = getByTestId('loginPassword');
      const loginPasswordConfirm = getByTestId('loginPasswordConfirm');
      const loginPasswordErr = getByTestId('loginPasswordErr');
      fireEvent.change(loginPassword, { target: { value: 'hogehogehoge' } });
      fireEvent.change(loginPasswordConfirm, { target: { value: 'hogehogehoge' } });
      fireEvent.click(submitBtn)
      expect(loginPasswordErr.innerHTML).toBe('');
    });
  })

})

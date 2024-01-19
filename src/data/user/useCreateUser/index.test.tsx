import "@testing-library/jest-dom"

import { act, render, renderHook, screen } from "@testing-library/react"

import axios from 'axios'
import { useCreateUser } from "./"

describe("useCreateUser", () => {

  it('何も入力せずに登録した場合', async () => {
    const { result } = renderHook(() => useCreateUser());
    expect(result.current.nameError).toBe('');
    expect(result.current.emailError).toBe('');
    expect(result.current.passwordError).toBe('');
    expect(result.current.createUserLoading).toBe(false);
    await act(async () => {
      await result.current.createUser('', '', '', '');
    });
    expect(result.current.nameError).toBe('名前は必須です');
    expect(result.current.emailError).toBe('正しい形式で入力してください');
    expect(result.current.passwordError).toBe('パスワードは8桁以上で設定してください');
    expect(result.current.createUserLoading).toBe(false);
  });

})

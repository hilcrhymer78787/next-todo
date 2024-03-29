import "@testing-library/jest-dom"

import { act, renderHook } from "@testing-library/react"

import { RecoilRoot } from "recoil"
import { mockUser } from "@/pages/api/user/read"
import { myAxios } from "@/plugins/axios"
import { useReadUser } from "./"

const renderFunc = () => {
  return renderHook(() => useReadUser(), {
    wrapper: RecoilRoot
  })
}
jest.mock("@/plugins/axios")
describe("useReadUser", () => {
  it("通信成功", async () => {
    const { result } = renderFunc()
    expect(result.current.user).toBe(undefined)
    await act(async () => {
      const axios: any = myAxios
      axios.mockResolvedValue({ data: mockUser })
      await result.current.readUser()
    })
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.readUserError).toBe("")
  })

  it("通信失敗", async () => {
    const { result } = renderFunc()
    expect(result.current.user).toBe(undefined)
    await act(async () => {
      const axios: any = myAxios
      axios.mockRejectedValue({
        response: {
          status: 401,
          statusText: "Unauthorized",
          data: { errorMessage: "トークンが有効ではありません" }
        }
      })
      await result.current.readUser()
    })
    expect(result.current.user).toBe(null)
    expect(result.current.readUserError).toBe("トークンが有効ではありません")
  })
})

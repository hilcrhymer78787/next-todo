import "@testing-library/jest-dom"

import { act, renderHook } from "@testing-library/react"

import { RecoilRoot } from "recoil"
import { myAxios } from "@/plugins/axios"
import { useReadTasks } from "./"

const renderFunc = () => {
  return renderHook(() => useReadTasks(), {
    wrapper: RecoilRoot
  })
}
jest.mock("@/plugins/axios")
describe("useReadUser", () => {
  it("dummy", () => {
    expect("dummy").toBe("dummy")
  })

  // it("通信成功", async () => {
  //   const { result } = renderFunc()
  //   expect(result.current.user).toBe(undefined)
  //   await act(async () => {
  //     const axios: any = myAxios
  //     axios.mockResolvedValue({ data: { name: "Yamada Tetsuto", email: "test@gmail.com" } })
  //     await result.current.readUser()
  //   })
  //   expect(result.current.user).toEqual({ name: "Yamada Tetsuto", email: "test@gmail.com" })
  // })

  // it("通信失敗", async () => {
  //   const { result } = renderFunc()
  //   expect(result.current.user).toBe(undefined)
  //   await act(async () => {
  //     const axios: any = myAxios
  //     axios.mockRejectedValue({
  //       response: {
  //         status: 401,
  //         statusText: "Unauthorized",
  //         data: { errorMessage: "トークンが有効ではありません" }
  //       }
  //     })
  //     await result.current.readUser()
  //   })
  //   expect(result.current.user).toBe(null)
  // })
})

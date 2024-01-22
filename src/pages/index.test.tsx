import "@testing-library/jest-dom"

import { act, fireEvent, render } from "@testing-library/react"

import Home from "./"
import { RecoilRoot } from "recoil"
import { mockUser } from "@/pages/api/user/read"
import { myAxios } from "@/plugins/axios"

jest.mock("@/plugins/axios")

const push = jest.fn()
jest.mock("next/router", () => ({
  useRouter: () => {
    return {
      push
    }
  }
}))

const renderFunc = () => {
  return act(async () => {
    const axios: any = myAxios
    axios.mockResolvedValueOnce({ data: mockUser })
    return render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    )
  })
}
describe("Home", () => {
  test("タスクページへリダイレクトする", async () => {
    await renderFunc()
    expect(push).toHaveBeenCalledWith("/task")
  })
})

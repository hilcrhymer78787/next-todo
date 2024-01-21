import "@testing-library/jest-dom"

import { fireEvent, render } from "@testing-library/react"
import { Table, TableBody } from "@mui/material"

import TaskItem from "./"
import { mockTasks } from "@/pages/api/task/readall"

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
  return render(
    <Table>
      <TableBody>
        <TaskItem task={mockTasks[0]} i={0} />
      </TableBody>
    </Table>
  )
}

describe("TaskItem", () => {
  const { click } = fireEvent

  test("コンポーネントが表示される", () => {
    const { getByTestId } = renderFunc()
    expect(getByTestId("TaskItem-0")).toBeInTheDocument()
  })

  test("クリックしたらページ遷移する", () => {
    const { getByTestId } = renderFunc()
    click(getByTestId("TaskItem-0"))
    expect(push).toHaveBeenCalledWith("/task/read?taskId=1")
  })
})

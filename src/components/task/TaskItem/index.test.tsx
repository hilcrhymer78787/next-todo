import "@testing-library/jest-dom"

import { fireEvent, render } from "@testing-library/react"
import { Table, TableBody } from "@mui/material"

import TaskItem from "./"
import { mockTasks } from "@/pages/api/task/readall"
import {useRouter} from "next/router"

jest.mock("@/plugins/axios")
const renderFunc = () => {
  return render(
  <Table>
    <TableBody>
    <TaskItem task={mockTasks[0]} i={0} />
    </TableBody>
  </Table>
  )
}

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe("TaskItem", () => {
  const { click } = fireEvent

  test("コンポーネントが表示される", () => {
    const { getByTestId } = renderFunc()
    expect(getByTestId("TaskItem-0")).toBeInTheDocument()
  })

  test('クリックしたらページ遷移する', () => {
    const pushMock = jest.fn()
    //@ts-ignore
    useRouter.mockReturnValue({
      push: pushMock,
    })
    const { getByTestId } = renderFunc()
    click(getByTestId('TaskItem-0'));  
    expect(pushMock).toHaveBeenCalledWith('/task/read?taskId=1');
  });
})

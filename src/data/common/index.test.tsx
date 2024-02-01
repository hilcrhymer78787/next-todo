import { AxiosError } from "axios"
import { errHandler } from "./"

describe("errHandler", () => {
  test("errorMessageがあれば渡される", () => {
    const errorMessage = "Sample error message"
    const mockError = {
      response: {
        data: {
          errorMessage: errorMessage
        }
      }
    } as AxiosError<{ errorMessage: string }>
    const setter = jest.fn()
    errHandler(mockError, setter)
    expect(setter).toHaveBeenCalledWith(errorMessage)
  })

  test("errorMessageがない場合はstatusとstatusTextが渡される", () => {
    const statusCode = 404
    const statusText = "Not Found"
    const mockError = {
      response: {
        status: statusCode,
        statusText: statusText
      }
    } as AxiosError<{ errorMessage: string }>
    const setter = jest.fn()
    errHandler(mockError, setter)
    expect(setter).toHaveBeenCalledWith(`${statusCode}：${statusText}`)
  })

  test("sets errorStatusText when response is undefined", () => {
    const mockError = {} as AxiosError<{ errorMessage: string }>
    const setter = jest.fn()
    errHandler(mockError, setter)
    expect(setter).toHaveBeenCalledWith("不明なエラー")
  })
})

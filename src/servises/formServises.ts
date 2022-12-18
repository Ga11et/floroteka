import { IErrorMessages } from './../store/types/admin'
type errorMessagesType = {
  [unit: string]: string
}

export const formServises = {
  errorMappingOld(response: { param: string; msg: string }[], errorMessages: errorMessagesType) {
    response.forEach((el) => {
      const location = el.param.slice(5) as string
      errorMessages[location] = el.msg
    })
  },
  errorMapping(response: { param: string; msg: string }[]): IErrorMessages {
    const errors: IErrorMessages = {}
    response.forEach((el) => {
      const location = el.param.slice(5) as string
      errors[location] = el.msg
    })
    return errors
  },
  errorMappingWithImg(response: { param: string; msg: string }[]): IErrorMessages {
    const errors: IErrorMessages = {}
    response.forEach((el) => {
      const location = el.param.slice(5) as string
      if (location.slice(0, 3) === 'img') errors.img = el.msg
      else errors[location] = el.msg
    })
    return errors
  },
}

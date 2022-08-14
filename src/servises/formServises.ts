import { plantErrorMessages } from './../store/models/formTypes'

export const formServises = {
  plantErrorMapping (response: { param: string, msg: string }[], errorMessages: plantErrorMessages) {
    response.forEach(el => {
      const location = el.param.slice(5) as string
      errorMessages[location] = el.msg
    })
  }
}

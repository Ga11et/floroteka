type errorMessagesType = {
  [unit: string]: string
}

export const formServises = {
  errorMapping(response: { param: string; msg: string }[], errorMessages: errorMessagesType) {
    response.forEach((el) => {
      const location = el.param.slice(5) as string
      errorMessages[location] = el.msg
    })
  },
}

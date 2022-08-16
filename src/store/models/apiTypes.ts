type localResponseType = 'ok' | {
  param: string,
  msg: string
}[]

export type APIResponseType = Promise<localResponseType>
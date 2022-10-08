type localResponseType = 'ok' | {
  param: string,
  msg: string
}[]

export type APIResponseType = Promise<localResponseType>

export interface IDeleteGalleryPhoto {
  photoId: string
}

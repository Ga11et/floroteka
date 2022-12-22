export type localResponseType =
  | 'ok'
  | {
      param: string
      msg: string
    }[]

export type APIResponseType = Promise<localResponseType>

export interface IDeleteGalleryPhoto {
  photoId: string
}

export type ILoginFormResponse =
  | {
      param: string
      msg: string
    }[]
  | { token: string }

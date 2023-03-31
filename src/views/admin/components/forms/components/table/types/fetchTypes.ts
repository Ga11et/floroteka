export interface IPost {
  id: string
  heading: string
  description: string
  date: number
  text: string
  before: ImageType
  after: ImageType
  images: ImageType[]
  type: postType
  shouldShow: boolean
}

export type postType =
  | 'studyProject'
  | 'scienceActivity'
  | 'beforeAfter'
  | 'technologies'
  | 'things'

export type ImageType = {
  id: string
  small: string
  full: string
}

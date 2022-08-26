type postType = 'studyProject' | 'scienceActivity' | 'beforeAfter' | 'technologies' | 'things'

export type beforeAfterPostPropsType = {
  id: string
  heading: string
  date: Date
  description: string
  before: string
  after: string
}
export type PostPropsType = {
  id: string
  description: string
  heading: string
  date: string
  text: string
  before: string
  after: string
  images: string[]
  type: postType
}
export type LoginData = {
  login: string,
  password: string
}
export type FormType = 'scienceForm' | 'studyProject' | 'photoForm' | 'thingsForm' | 'plantForm' | 'beforeAfterPostForm' | 'technologiesForm' | undefined

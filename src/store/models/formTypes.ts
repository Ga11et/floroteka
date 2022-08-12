export type BeforeAfterFormType = {
  heading: string
  description: string
  before: string
  after: string
}
export type technologiesFormType = {
  heading: string
  description: string
  stepPhotos: string[]
  stepTexts: string[]
}
export type thingsFormType = {
  heading: string
  description: string
  photos: string[]
}
export type photosFormType = {
  photo: string
}

export type ErrorMessagesBeforeAfterPost = {
  [unit: string]: string
  heading: string
  description: string
  before: string
  after: string
}
export type technologiesErrorMessages = {
  [unit: string]: string
  origin: string
  heading: string
  description: string
  stepPhotos: string
  stepTexts: string
}
export type thingsErrorMessages = {
  [unit: string]: string
  origin: string
  heading: string
  description: string
  photos: string
}
export type photosErrorMessages = {
  [unit: string]: string
  origin: string
  photo: string
}
export type loginErrorMessages = {
  [unit: string]: string
  login: string
  pass: string
}
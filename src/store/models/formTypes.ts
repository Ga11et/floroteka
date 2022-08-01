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
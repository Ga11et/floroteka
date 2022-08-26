import { PlantType } from './appTypes'

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
  lastModified: string
}
export type plantFormType = {
  name: string
  latin: string
  description: string
  date: string
  family: string
  from: string
  livingPlace: string
  having: boolean
  type: PlantType
  img: string[]
}
export type scienceActivityFormType = {
  heading: string
  description: string
  img: string
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
export type plantErrorMessages = {
  [unit: string]: string
  origin: string
  name: string
  latin: string
  description: string
  img: string
  date: string
  family: string
  from: string
  livingPlace: string
}
export type scienceActivityErrorMessages = {
  [unit: string]: string
  heading: string
  description: string
  img: string
}

export type deletePlantFormType = {
  id: string
  pass: string
}

export type updatePlantFormType = {
  data: plantFormType
  pass: string
  plantId: string
}


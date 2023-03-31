import { PlantType } from './plants'

export type FormType =
  | 'scienceForm'
  | 'studyProject'
  | 'photoForm'
  | 'thingsForm'
  | 'plantForm'
  | 'beforeAfterPostForm'
  | 'technologiesForm'
  | undefined

export interface adminNavLink {
  rus: string
  en: string
  id: string
}

export interface IErrorMessages {
  [unit: string]: string
}

// Universal Form
export type IUniversalForm =
  | IBeforeAfterPostForm
  | IBeforeAfterPostErrorMessages
  | ITechnologiesPostForm
  | IThingsPostForm
  | IProjectPostForm
  | IScienceActivityPostForm

// Plant form
export interface IPlantForm {
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
  shouldShow: boolean
}
// Before and After form
export interface IBeforeAfterPostForm {
  heading: string
  description: string
  before: string
  after: string
  shouldShow: boolean
}
export interface IBeforeAfterPostErrorMessages {
  [unit: string]: string
  heading: string
  description: string
  before: string
  after: string
}
// Technologies Form
export interface ITechnologiesPostForm {
  heading: string
  description: string
  stepPhotos: string[]
  stepTexts: string[]
  shouldShow: boolean
}
// Things Form
export interface IThingsPostForm {
  heading: string
  description: string
  photos: string[]
  shouldShow: boolean
}
// Project Form
export interface IProjectPostForm {
  heading: string
  description: string
  stepPhotos: string[]
  stepTexts: string[]
  shouldShow: boolean
}
// Science Activity Form
export interface IScienceActivityPostForm {
  heading: string
  description: string
  img: string
  shouldShow: boolean
}
// Login Form
export interface ILoginForm {
  login: string
  pass: string
}

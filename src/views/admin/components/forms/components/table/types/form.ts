export type PlantType =
  | 'Деревья'
  | 'Декоративные кустарники'
  | 'Плодово-ягодные деревья и кустарники'
  | 'Ягодники'
  | 'Многолетние декоративные травянистые растения'
  | 'Однолетние декоративные травянистые растения'
  | 'Почвопокровные растения'
  | 'Декоративные объекты'
  | 'Комнатные растения'
  | 'Овощные культуры'

// Universal Form
export type IUniversalForm =
  | IThingsPostForm
  | IPlantForm
  | IBeforeAfterPostForm
  | IBeforeAfterPostErrorMessages
  | ITechnologiesPostForm
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
}
// Before and After form
export interface IBeforeAfterPostForm {
  heading: string
  description: string
  before: string
  after: string
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
}
// Things Form
export interface IThingsPostForm {
  heading: string
  description: string
  photos: string[]
}
// Project Form
export interface IProjectPostForm {
  heading: string
  description: string
  stepPhotos: string[]
  stepTexts: string[]
}
// Science Activity Form
export interface IScienceActivityPostForm {
  heading: string
  description: string
  img: string
}
// Login Form
export interface ILoginForm {
  login: string
  pass: string
}

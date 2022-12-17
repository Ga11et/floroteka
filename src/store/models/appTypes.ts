export type imageType = {
  full: string
  small: string
  id: string
}
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

export type postType =
  | 'studyProject'
  | 'scienceActivity'
  | 'beforeAfter'
  | 'technologies'
  | 'things'

export type GaleryPhotoType = {
  id: string
  image: imageType
  lastModified: string
}
export type plantPropsType = {
  name: string
  description: string
  img: imageType[]
  id: string
  latin: string
  date: string
  family: string
  from: string
  livingPlace: string
  having: boolean
  type: PlantType
}
export type postPropsType = {
  id: string
  description: string
  heading: string
  date: string
  text: string
  before: imageType
  after: imageType
  images: imageType[]
  type: postType
}
export type LoginData = {
  login: string
  password: string
}

export type IRootStore = {
  token: string
  isAuth: boolean
}
export interface IOpenablePart {
  image: imageType
  text: string
  step: number
  stepWord: 'шаг' | 'этап'
}

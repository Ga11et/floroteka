type postType = 'studyProject' | 'scienceActivity' | 'beforeAfter' | 'technologies' | 'things'
export type PlantType = 'Деревья' | 'Декоративные кустарники' | 'Плодово-ягодные деревья и кустарники' |
  'Ягодники' | 'Многолетние декоративные травянистые растения' | 'Однолетние декоративные травянистые растения' |
  'Почвопокровные растения' | 'Декоративные объекты' | 'Комнатные растения' | 'Овощные культуры'

export type plantPropsType = {
  name: string
  description: string
  img: string[]
  id: string
  latin: string
  date: string
  family: string
  from: string
  livingPlace: string
  having: boolean
  type: PlantType
}
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
export type ErrorMessagesPlantAddingFormType = {
  [unit: string]: string
  name: string
  latin: string
  description: string
  img: string
  date: string
  family: string
  from: string
  livingPlace: string
}
export type LoginData = {
  login: string,
  password: string
}
export type FormType = 'studyProject' | 'photoForm' | 'thingsForm' | 'plantForm' | 'beforeAfterPostForm' | 'technologiesForm' | undefined

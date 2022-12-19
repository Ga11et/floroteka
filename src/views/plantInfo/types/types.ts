// local types
export interface IImage {
  full: string
  small: string
  id: string
}
type PlantType =
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

export interface IPlant {
  name: string
  description: string
  img: IImage[]
  id: string
  latin: string
  date: string
  family: string
  from: string
  livingPlace: string
  having: boolean
  type: PlantType
}

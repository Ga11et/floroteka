export interface INavHeader {
  id: string
  ru: string
  en: string
  children?: { id: string; ru: string; en: string }[]
}

import { plantPropsType, plantAirtableContentType } from '../models'

const prod = 'https://florotekaback.herokuapp.com'
const dev = 'http://localhost:3000'

export const fetchPlantsData = async () => {
  const response = await fetch(prod + '/plants')
    .then(resp => resp.json())
  return response
}

export const fetchAllPostsData = async () => {
  const response = await fetch(prod + '/posts')
    .then(resp => resp.json())
  return response
}

export const postPlantData = async (plantFormData: plantPropsType) => {
  const response = await fetch(prod + '/plants', { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: plantFormData }) })
    .then(resp => resp.json())
  return response
}

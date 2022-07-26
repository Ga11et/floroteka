import { plantPropsType, plantAirtableContentType, LoginData } from '../models'

const prod = 'https://florotekaback.herokuapp.com'
// const prod = 'http://localhost:3000'

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

export const getAutherisied = async (data: LoginData) => {
  const returnData = await fetch(prod + '/login', { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: data }) })
    .then(response => response.json())
  return returnData
}

import store from '..'
import { plantPropsType, LoginData } from '../models'
import { BeforeAfterFormType, deletePlantFormType, photosFormType, technologiesFormType, thingsFormType } from '../models/formTypes'

const prod = 'https://florotekaback.herokuapp.com'
// const prod = 'http://localhost:3000'

type postRequestData = plantPropsType | BeforeAfterFormType | technologiesFormType | thingsFormType | photosFormType
type deleteRequestData = deletePlantFormType

const createPostRequest = async (postType: postRequestData, path: string, token: string) => {
  const response = await fetch(prod + path, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ data: postType })
  }).then(async (resp) => {
    if (resp.status !== 401) return resp.json()
    store.dispatch('getRefresh')
    return [{ param: 'data.origin', msg: 'Токен устарел и был обновлен, подтвердите форму еще раз' }]
  })
  return response
}
const createDeleteRequest = async (requestData: deleteRequestData, path: string, token: string) => {
  const response = await fetch(prod + path, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ data: requestData })
  }).then(async (resp) => {
    if (resp.status !== 401) return resp.json()
    store.dispatch('getRefresh')
    return [{ param: 'data.origin', msg: 'Токен устарел и был обновлен, подтвердите форму еще раз' }]
  })
  return response
}

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

export const postPlantData = async (plantFormData: plantPropsType, token: string) => {
  return await createPostRequest(plantFormData, '/plants', token)
}

export const postBeforeAfterPostData = async (formData: BeforeAfterFormType, token: string) => {
  return await createPostRequest(formData, '/beforeAfter', token)
}

export const postTechnologiesPostData = async (formData: technologiesFormType, token: string) => {
  return await createPostRequest(formData, '/technologies', token)
}

export const postThingsPostData = async (formData: thingsFormType, token: string) => {
  return await createPostRequest(formData, '/things', token)
}

export const florotekaAPI = {
  fetchGalery: async () => {
    const response = await fetch(prod + '/galery')
      .then(resp => resp.json())
    return response
  },
  postPhotoPostData: async (formData: photosFormType, token: string) => {
    return await createPostRequest(formData, '/galery', token)
  },
  postStudyProjectPostData: async (formData: technologiesFormType, token: string) => {
    return await createPostRequest(formData, '/studyProject', token)
  }
}

export const deleteAPI = {
  deletePlant: async (formData: deletePlantFormType, token: string) => {
    return await createDeleteRequest(formData, '/plants', token)
  }
}

export const getAutherisied = async (data: LoginData): Promise<{ token: string }> => {
  const returnData = await fetch(prod + '/login', { method: 'POST', mode: 'cors', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: data }) })
    .then(response => response.json())
  return returnData
}

export const isAutherisied = async (): Promise<{ token: string }> => {
  const returnData = await fetch(prod + '/refresh', { method: 'GET', mode: 'cors', credentials: 'include' })
    .then(response => response.json())
  return returnData
}

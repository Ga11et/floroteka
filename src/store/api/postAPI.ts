import store from '..'
import { LoginData } from '../models'
import { APIResponseType } from '../models/apiTypes'
import { BeforeAfterFormType, photosFormType, plantFormType, scienceActivityFormType, technologiesFormType, thingsFormType } from '../models/formTypes'
import { prod } from './api'

type postRequestData = scienceActivityFormType | plantFormType | BeforeAfterFormType | technologiesFormType | thingsFormType | photosFormType

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

export const postAPI = {
  async postPlantData (plantFormData: plantFormType, token: string): APIResponseType {
    return await createPostRequest(plantFormData, '/plants', token)
  },
  async postBeforeAfterPostData (formData: BeforeAfterFormType, token: string): APIResponseType {
    return await createPostRequest(formData, '/beforeAfter', token)
  },
  async postTechnologiesPostData (formData: technologiesFormType, token: string): APIResponseType {
    return await createPostRequest(formData, '/technologies', token)
  },
  async postThingsPostData (formData: thingsFormType, token: string): APIResponseType {
    return await createPostRequest(formData, '/things', token)
  },
  async postPhotoPostData (formData: photosFormType, token: string): APIResponseType {
    return await createPostRequest(formData, '/galery', token)
  },
  async postStudyProjectPostData (formData: technologiesFormType, token: string): APIResponseType {
    return await createPostRequest(formData, '/studyProject', token)
  },
  async postScienceActivityPostData (formData: scienceActivityFormType, token: string): APIResponseType {
    return await createPostRequest(formData, '/scienceActivity', token)
  },
  async getAutherisied (data: LoginData): Promise<{ token: string }> {
    const returnData = await fetch(prod + '/login', { method: 'POST', mode: 'cors', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: data }) })
      .then(response => response.json())
    return returnData
  }
}

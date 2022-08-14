import store from '..'
import { plantFormType } from '../models/formTypes'
import { prod } from './api'

export type updateRequestData = {
  pass: string
  plantId: string
  formData: plantFormType
}

const createUpdateRequest = async (requestData: updateRequestData, path: string, token: string) => {
  const response = await fetch(prod + path, {
    method: 'PUT',
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

export const updateAPI = {
  updatePlant: async (formData: updateRequestData, token: string) => {
    return await createUpdateRequest(formData, '/plants', token)
  }
}

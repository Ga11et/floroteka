import store from '..'
import { APIResponseType } from '../models/apiTypes'
import { deletePlantFormType } from '../models/formTypes'
import { prod } from './api'

type deleteRequestData = deletePlantFormType

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

export const deleteAPI = {
  deletePlant: async (formData: deletePlantFormType, token: string): APIResponseType => {
    return await createDeleteRequest(formData, '/plants', token)
  },
  async post (formData: deletePlantFormType, token: string): APIResponseType {
    return await createDeleteRequest(formData, '/posts', token)
  }
}

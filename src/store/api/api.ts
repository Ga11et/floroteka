import { PostPropsType } from '../models'
import { GaleryPhotoType, plantPropsType } from '../models/appTypes'

export const prod = process.env.VUE_APP_SERVER_URL || 'https://florotekaback.herokuapp.com'

export const florotekaAPI = {
  async fetchGalery (): Promise<GaleryPhotoType[]> {
    const response = await fetch(prod + '/galery')
      .then(resp => resp.json())
    return response
  },
  async fetchPlantsData (): Promise<plantPropsType[]> {
    const response = await fetch(prod + '/plants')
      .then(resp => resp.json())
    return response
  },
  async fetchAllPostsData (): Promise<PostPropsType[]> {
    const response = await fetch(prod + '/posts')
      .then(resp => resp.json())
    return response
  },
  async isAutherisied (): Promise<{ token: string }> {
    const returnData = await fetch(prod + '/refresh', { method: 'GET', mode: 'cors', credentials: 'include' })
      .then(response => response.json())
    return returnData
  }
}

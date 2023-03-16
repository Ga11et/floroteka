import { IUniversalForm } from './../../views/admin/components/forms/components/table/types/form'
export const prod = process.env.VUE_APP_SERVER_URL || 'https://florotekaback.herokuapp.com'

export const AdminFormAPI = {
  async getPostById(postId: string) {
    const response = await fetch(prod + '/post/' + postId).then((resp) => resp.json())
    return response
  },
  async postPostById(postId: string, postData: IUniversalForm, token: string) {
    const response = await fetch(prod + '/post/' + postId, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: postData }),
    }).then((resp) => resp.json())
    return response
  },
}

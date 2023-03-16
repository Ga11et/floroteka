import { formServises } from '../../servises/formServises'
import { Commit } from 'vuex'
import { localResponseType } from '../models/apiTypes'

export const storeServises = {
  postFormCommits(response: localResponseType, commit: Commit) {
    if (response !== 'ok') {
      const errors = formServises.errorMapping(response)
      commit('setErrorMessages', errors)
      commit('setAdminLoading', false)
    }
    if (response === 'ok') {
      commit('setFormType', undefined)
      commit('setAdminLoading', false)
    }
  },
  postFormCommitsWithImg(response: localResponseType, commit: Commit) {
    if (response !== 'ok') {
      const errors = formServises.errorMappingWithImg(response)
      commit('setErrorMessages', errors)
      commit('setAdminLoading', false)
    }
    if (response === 'ok') {
      commit('setFormType', undefined)
      commit('setAdminLoading', false)
    }
  },
}

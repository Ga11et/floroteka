import { formServises } from './../../servises/formServises'
import { Module } from 'vuex'
import { postAPI } from '../api/postAPI'
import { IRootStore } from '../models/appTypes'
import {
  FormType,
  IBeforeAfterPostErrorMessages,
  IBeforeAfterPostForm,
  IErrorMessages,
  IPlantForm,
  ITechnologiesPostForm,
} from '../types/admin'

interface IAdminSlice {
  errorMessages: IBeforeAfterPostErrorMessages
  isAdminLoading: boolean
  formType: FormType
}

const AdminSlice: Module<IAdminSlice, IRootStore> = {
  state: {
    errorMessages: {} as IBeforeAfterPostErrorMessages,
    isAdminLoading: false,
    formType: undefined,
  },
  getters: {
    errorMessages(state) {
      return state.errorMessages
    },
    adminLoading(state) {
      return state.isAdminLoading
    },
    formType(state) {
      return state.isAdminLoading
    },
  },
  mutations: {
    setErrorMessages(state, payload: IBeforeAfterPostErrorMessages) {
      state.errorMessages = payload
    },
    setAdminLoading(state, payload: boolean) {
      state.isAdminLoading = payload
    },
    setFormType(state, payload: FormType) {
      state.formType = payload
    },
  },
  actions: {
    async addBeforeAfterPost({ commit, rootState }, payload: IBeforeAfterPostForm) {
      commit('setAdminLoading', true)
      const response = await postAPI.postBeforeAfterPostData(payload, rootState.token)
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
    async addPlant({ commit, rootState }, payload: IPlantForm) {
      commit('setAdminLoading', true)
      const response = await postAPI.postPlantData(payload, rootState.token)
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
    async addTechnologyPost({ commit, rootState }, payload: ITechnologiesPostForm) {
      commit('setAdminLoading', true)
      const response = await postAPI.postTechnologiesPostData(payload, rootState.token)
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
  },
}

export default AdminSlice

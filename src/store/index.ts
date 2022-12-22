import { formServises } from './../servises/formServises'
import Vue from 'vue'
import Vuex from 'vuex'
import { florotekaAPI } from './api/api'
import { postAPI } from './api/postAPI'
import plantsSlice from './modules/plantsSlice'
import PostsSlice from './modules/postsSlice'
import GalerySlice from './modules/galerySlice'
import { LoginData } from './models/appTypes'
import AdminSlice from './modules/adminSlice'
import HeaderSlice from './modules/headerSlice'
import { IErrorMessages } from './types/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    isAuth: false,
    errorMessages: {},
    isLoading: false,
  },
  getters: {
    getToken(state) {
      return state.token
    },
    isAuth(state) {
      return state.isAuth
    },
    getLoginLoading(state) {
      return state.isLoading
    },
    getLoginErrorMessages(state) {
      return state.errorMessages
    },
  },
  mutations: {
    setToken(state, payload: string) {
      state.token = payload
    },
    setAuth(state, payload: boolean) {
      state.isAuth = payload
    },
    setLoginErrorMessages(state, payload: IErrorMessages) {
      state.errorMessages = payload
    },
    setLoginLoading(state, payload: boolean) {
      state.isLoading = payload
    },
  },
  actions: {
    async getAuth({ commit }, data: LoginData) {
      commit('setLoginLoading', true)
      const returnData = await postAPI.getAutherisied(data)
      if (Array.isArray(returnData)) {
        const errors = formServises.errorMapping(returnData)
        commit('setLoginErrorMessages', errors)
        commit('setLoginLoading', false)
        return null
      }
      commit('setLoginErrorMessages', [])
      commit('setToken', returnData.token)
      commit('setAuth', true)
      commit('setLoginLoading', false)
      return 'ok'
    },
    async getRefresh({ commit }) {
      const returnData = await florotekaAPI.isAutherisied()
      if (returnData.token) {
        commit('setToken', returnData.token)
        commit('setAuth', true)
        return 'ok'
      }
      return returnData
    },
  },
  modules: {
    plantsSlice: plantsSlice,
    postsSlice: PostsSlice,
    galerySlice: GalerySlice,
    adminSlice: AdminSlice,
    headerSlice: HeaderSlice,
  },
})

import Vue from 'vue'
import Vuex from 'vuex'
import { florotekaAPI } from './api/api'
import { postAPI } from './api/postAPI'
import plantsSlice from './modules/plantsSlice'
import PostsSlice from './modules/postsSlice'
import GalerySlice from './modules/galerySlice'
import { LoginData } from './models/appTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    isAuth: false
  },
  getters: {
    getToken: (state) => {
      return state.token
    },
    isAuth (state) {
      return state.isAuth
    }
  },
  mutations: {
    setToken (state, payload: string) {
      state.token = payload
    },
    getAuth (state, payload: boolean) {
      state.isAuth = payload
    }
  },
  actions: {
    async getAuth ({ commit }, data: LoginData) {
      const returnData = await postAPI.getAutherisied(data)
      if (returnData.token) {
        commit('setToken', returnData.token)
        commit('getAuth', true)
        return 'ok'
      }
      return returnData
    },
    async getRefresh ({ commit }) {
      const returnData = await florotekaAPI.isAutherisied()
      if (returnData.token) {
        commit('setToken', returnData.token)
        commit('getAuth', true)
        return 'ok'
      }
      return returnData
    }
  },
  modules: {
    plantsSlice: plantsSlice,
    postsSlice: PostsSlice,
    galerySlice: GalerySlice
  }
})

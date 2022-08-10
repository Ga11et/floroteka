import { fetchPlantsData, fetchAllPostsData, getAutherisied, isAutherisied } from './api/api'
import Vue from 'vue'
import Vuex from 'vuex'
import { LoginData, plantPropsType, PostPropsType } from './models'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plants: [] as plantPropsType[],
    allPosts: [] as PostPropsType[],
    postsLoaded: false,
    plantsLoaded: false,
    plantsFilterValue: '',
    activePlantId: '1',
    token: '',
    isAuth: false
  },
  getters: {
    beforeAfterPosts (state) {
      return state.allPosts.filter(el => el.type === 'beforeAfter')
    },
    sciensePosts (state) {
      return state.allPosts.filter(el => el.type === 'scienceActivity')
    },
    technologyPosts (state) {
      return state.allPosts.filter(el => el.type === 'technologies')
    },
    thingPosts (state) {
      return state.allPosts.filter(el => el.type === 'things')
    },
    filteredPlants (state) {
      return state.plants.filter(el => el.name.toLowerCase().indexOf(state.plantsFilterValue.toLowerCase()) !== -1)
    },
    activePlant: (state) => {
      return state.plants.find(el => el.id === state.activePlantId)
    },
    randomPlants: (state) => (count: number) => {
      const reccomendations: plantPropsType[] = []
      for (let index = 0; index < count; index++) {
        let index = Math.floor((Math.random() * 100) % state.plants.length)
        while (reccomendations.find(el => el.id === state.plants[index].id) !== undefined) {
          index = Math.floor((Math.random() * 100) % state.plants.length)
        }
        reccomendations.push(state.plants[index])
      }
      return reccomendations
    },
    getToken: (state) => {
      return state.token
    }
  },
  mutations: {
    setPlants (state, payload) {
      state.plants = payload
    },
    setplantsLoaded (state, payload: boolean) {
      state.plantsLoaded = payload
    },
    setAllPosts (state, payload: PostPropsType[]) {
      state.allPosts = payload.sort((prev, next) => {
        return prev.date > next.date ? -1 : 1
      })
      state.postsLoaded = true
    },
    setPostsLoaded (state, payload: boolean) {
      state.postsLoaded = payload
    },
    setPlantsFilterValue (state, payload: string) {
      state.plantsFilterValue = payload
    },
    setActivePlant (state, payload: string) {
      state.activePlantId = payload
    },
    setToken (state, payload: string) {
      state.token = payload
    },
    getAuth (state, payload: boolean) {
      state.isAuth = payload
    }
  },
  actions: {
    async setPlants ({ commit }) {
      const data = await fetchPlantsData()
      commit('setPlants', data)
      commit('setplantsLoaded', true)
    },
    async setPosts ({ commit }) {
      const data = await fetchAllPostsData()
      commit('setAllPosts', data)
      commit('setPostsLoaded', true)
    },
    async getAuth ({ commit }, data: LoginData) {
      const returnData = await getAutherisied(data)
      if (returnData.token) {
        commit('setToken', returnData.token)
        commit('getAuth', true)
        return 'ok'
      }
      return returnData
    },
    async getRefresh ({ commit }) {
      const returnData = await isAutherisied()
      if (returnData.token) {
        commit('setToken', returnData.token)
        commit('getAuth', true)
        return 'ok'
      }
      return returnData
    }
  },
  modules: {
  }
})

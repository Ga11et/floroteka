import Vue from 'vue'
import Vuex from 'vuex'
import { LoginData, PostPropsType } from './models'
import { GaleryPhotoType, plantPropsType } from './models/appTypes'
import router from '@/router'
import { deletePlantFormType } from './models/formTypes'
import { updateAPI, updateRequestData } from './api/updateAPI'
import { florotekaAPI } from './api/api'
import { postAPI } from './api/postAPI'
import { deleteAPI } from './api/deleteAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plants: [] as plantPropsType[],
    allPosts: [] as PostPropsType[],
    photos: [] as GaleryPhotoType[],
    postsLoaded: false,
    plantsLoaded: false,
    galeryLoaded: false,
    plantsFilterValue: '',
    postsFilterValue: '',
    activePlantId: '1',
    token: '',
    isAuth: false
  },
  getters: {
    beforeAfterPosts (state) {
      return state.allPosts.filter(el => el.type === 'beforeAfter' && el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1)
    },
    sciensePosts (state) {
      return state.allPosts.filter(el => el.type === 'scienceActivity' && el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1)
    },
    technologyPosts (state) {
      return state.allPosts.filter(el => el.type === 'technologies' && el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1)
    },
    thingPosts (state) {
      return state.allPosts.filter(el => el.type === 'things' && el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1)
    },
    studyProjectPosts (state) {
      return state.allPosts.filter(el => el.type === 'studyProject' && el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1)
    },
    filteredPosts (state) {
      return state.allPosts.filter(el => el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1)
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
    },
    photos: (state) => {
      return state.photos
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
    setPostsFilterValue (state, payload: string) {
      state.postsFilterValue = payload
    },
    setActivePlant (state, payload: string) {
      state.activePlantId = payload
    },
    setToken (state, payload: string) {
      state.token = payload
    },
    getAuth (state, payload: boolean) {
      state.isAuth = payload
    },
    setPhotos (state, payload: GaleryPhotoType[]) {
      state.photos = payload
      state.galeryLoaded = true
    }
  },
  actions: {
    async setPlants ({ commit }) {
      commit('setplantsLoaded', false)
      const data = await florotekaAPI.fetchPlantsData()
      commit('setPlants', data)
      commit('setplantsLoaded', true)
    },
    async setPosts ({ commit }) {
      commit('setPostsLoaded', false)
      const data = await florotekaAPI.fetchAllPostsData()
      commit('setAllPosts', data)
      commit('setPostsLoaded', true)
    },
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
    },
    async getGalery ({ commit }) {
      const returnData = await florotekaAPI.fetchGalery()
      commit('setPhotos', returnData)
    },
    async deletePlant ({ commit, state }, data: deletePlantFormType) {
      const returnData = await deleteAPI.deletePlant(data, state.token)
      if (returnData === 'ok') {
        const newState = state.plants.filter(el => el.id !== data.id)
        router.push('./')
        commit('setPlants', newState)
        return 'ok'
      } else {
        return returnData
      }
    },
    async updatePlant ({ commit, state }, data: updateRequestData) {
      const returnData = await updateAPI.updatePlant(data, state.token)
      if (returnData === 'ok') return 'ok'
      return returnData
    }
  },
  modules: {
  }
})

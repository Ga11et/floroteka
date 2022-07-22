import { fetchPlantsData, fetchAllPostsData } from './api/api'
import Vue from 'vue'
import Vuex from 'vuex'
import { plantPropsType, PostPropsType } from './models'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plants: [] as plantPropsType[],
    allPosts: [] as PostPropsType[],
    postsLoaded: false,
    plantsLoaded: false
  },
  getters: {
    beforeAfterPosts (state) {
      return state.allPosts.filter(el => el.type === 'beforeAfter')
    },
    sciensePosts (state) {
      return state.allPosts.filter(el => el.type === 'scienceActivity')
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
    }
  },
  modules: {
  }
})

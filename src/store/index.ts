import { fetchPlantsData } from './api/api'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
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
  },
  mutations: {
    setPlants (state, payload) {
      state.plants = payload
    },
    setplantsLoaded (state, payload: boolean) {
      console.log('worked')
      state.plantsLoaded = payload
    },
    setAllPosts (state, payload: PostPropsType[]) {
      state.allPosts = payload.sort((prev, next) => {
        return prev.date > next.date ? -1 : 1
      })
      state.postsLoaded = true
    }
  },
  actions: {
    async setPlants (context) {
      const data = await fetchPlantsData()
      await context.commit('setPlants', data)
      context.commit('setplantsLoaded', true)
    }
  },
  modules: {
  }
})

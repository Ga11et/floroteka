import Vue from 'vue'
import Vuex from 'vuex'
import { beforeAfterPostPropsType, plantPropsType } from './models'
import beforeTestImg from '../assets/beforeTest.jpg'
import afterTestImg from '../assets/afterTest.jpg'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plants: [] as plantPropsType[],
    beforeAfterPosts: [] as beforeAfterPostPropsType[]
  },
  getters: {
  },
  mutations: {
    setPlants (state, payload) {
      state.plants = payload
    },
    setBeforeAfterPosts (state, payload) {
      state.beforeAfterPosts = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

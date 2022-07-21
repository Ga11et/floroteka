import Vue from 'vue'
import Vuex from 'vuex'
import { beforeAfterPostPropsType, plantPropsType, PostPropsType } from './models'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plants: [] as plantPropsType[],
    allPosts: [] as PostPropsType[],
    postsLoaded: false
  },
  getters: {
  },
  mutations: {
    setPlants (state, payload) {
      state.plants = payload
    },
    setAllPosts (state, payload: PostPropsType[]) {
      state.allPosts = payload.sort((prev, next) => {
        return prev.date > next.date ? -1 : 1
      })
      state.postsLoaded = true
    }
  },
  actions: {
  },
  modules: {
  }
})

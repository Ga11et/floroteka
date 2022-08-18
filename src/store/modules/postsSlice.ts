import { Module } from 'vuex'
import { florotekaAPI } from '../api/api'
import { PostPropsType } from '../models'
import { IRootStore } from '../models/appTypes'

interface IPostsSlice {
  allPosts: PostPropsType[]
  postsLoaded: boolean
  postsFilterValue: string
}

const PostsSlice: Module<IPostsSlice, IRootStore> = {
  state: {
    allPosts: [],
    postsFilterValue: '',
    postsLoaded: false
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
    postsFilterValue (state) {
      return state.postsFilterValue
    },
    postsLoaded (state) {
      return state.postsLoaded
    }
  },
  mutations: {
    setAllPosts (state, payload: PostPropsType[]) {
      state.allPosts = payload.sort((prev, next) => {
        return prev.date > next.date ? -1 : 1
      })
      state.postsLoaded = true
    },
    setPostsLoaded (state, payload: boolean) {
      state.postsLoaded = payload
    },
    setPostsFilterValue (state, payload: string) {
      state.postsFilterValue = payload
    }
  },
  actions: {
    async setPosts ({ commit }) {
      commit('setAllPosts', [])
      commit('setPostsLoaded', false)
      const data = await florotekaAPI.fetchAllPostsData()
      commit('setAllPosts', data)
      commit('setPostsLoaded', true)
    }
  }
}

export default PostsSlice

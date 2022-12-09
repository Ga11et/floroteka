import { Module } from 'vuex'
import { florotekaAPI } from '../api/api'
import { deleteAPI } from '../api/deleteAPI'
import { IRootStore, postPropsType } from '../models/appTypes'

interface IPostsSlice {
  allPosts: postPropsType[]
  postsLoaded: boolean
  postsFilterValue: string
}

const PostsSlice: Module<IPostsSlice, IRootStore> = {
  state: {
    allPosts: [],
    postsFilterValue: '',
    postsLoaded: false,
  },
  getters: {
    beforeAfterPosts(state) {
      return state.allPosts.filter(
        (el) =>
          el.type === 'beforeAfter' &&
          el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1,
      )
    },
    sciensePosts(state) {
      return state.allPosts.filter(
        (el) =>
          el.type === 'scienceActivity' &&
          el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1,
      )
    },
    technologyPosts(state) {
      return state.allPosts.filter(
        (el) =>
          el.type === 'technologies' &&
          el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1,
      )
    },
    thingPosts(state) {
      return state.allPosts.filter(
        (el) =>
          el.type === 'things' &&
          el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1,
      )
    },
    studyProjectPosts(state) {
      return state.allPosts.filter(
        (el) =>
          el.type === 'studyProject' &&
          el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1,
      )
    },
    filteredPosts(state) {
      return state.allPosts.filter(
        (el) => el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1,
      )
    },
    postsFilterValue(state) {
      return state.postsFilterValue
    },
    postsLoaded(state) {
      return state.postsLoaded
    },
  },
  mutations: {
    setAllPosts(state, payload: postPropsType[]) {
      state.allPosts = payload.sort((prev, next) => {
        return prev.date > next.date ? -1 : 1
      })
      state.postsLoaded = true
    },
    setPostsLoaded(state, payload: boolean) {
      state.postsLoaded = payload
    },
    setPostsFilterValue(state, payload: string) {
      state.postsFilterValue = payload
    },
  },
  actions: {
    async setPosts({ commit }) {
      commit('setAllPosts', [])
      commit('setPostsLoaded', false)
      const data = await florotekaAPI.fetchAllPostsData()
      commit('setAllPosts', data)
      commit('setPostsLoaded', true)
    },
    async deletePost({ commit, rootState, state }, payload: { id: string; pass: string }) {
      const response = await deleteAPI.post(payload, rootState.token)
      if (response === 'ok') {
        const newPosts = state.allPosts.filter((post) => post.id !== payload.id)
        commit('setAllPosts', newPosts)
      }
      return response
    },
  },
}

export default PostsSlice

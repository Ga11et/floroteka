import { SortOptionType } from './../types/posts'
import { Module } from 'vuex'
import { florotekaAPI } from '../api/api'
import { deleteAPI } from '../api/deleteAPI'
import { IRootStore, postPropsType } from '../models/appTypes'

interface IPostsSlice {
  allPosts: postPropsType[]
  postsLoaded: boolean
  postsFilterValue: string
  postsSortOption: SortOptionType
  isReversed: boolean
  activePostId: string
}

const PostsSlice: Module<IPostsSlice, IRootStore> = {
  state: {
    allPosts: [],
    postsFilterValue: '',
    postsSortOption: 'Дата',
    isReversed: false,
    postsLoaded: false,
    activePostId: '',
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
      const filteredPosts = state.allPosts
        .filter(
          (el) => el.heading.toLowerCase().indexOf(state.postsFilterValue.toLowerCase()) !== -1,
        )
        .sort((a, b) => {
          if (state.postsSortOption === 'Название') return a.heading.localeCompare(b.heading)
          if (state.postsSortOption === 'Описание')
            return a.description.localeCompare(b.description)
          if (state.postsSortOption === 'Тип') return a.type.localeCompare(b.type)
          // date option
          return +b.date - +a.date
        })
      if (state.isReversed) return filteredPosts.reverse()
      return filteredPosts
    },
    postsFilterValue(state) {
      return state.postsFilterValue
    },
    postsLoaded(state) {
      return state.postsLoaded
    },
    isPostsReversed(state) {
      return state.isReversed
    },
    postsSortOption(state) {
      return state.postsSortOption
    },
    activeAdminPostId(state) {
      return state.activePostId
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
    setSortOption(state, payload: SortOptionType) {
      state.postsSortOption = payload
    },
    setReversed(state, payload?: boolean) {
      state.isReversed = payload === undefined ? !state.isReversed : payload
    },
    setActivePostId(state, payload: string) {
      state.activePostId = payload
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

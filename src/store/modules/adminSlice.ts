import {
  adminNavLink,
  ILoginForm,
  IProjectPostForm,
  IScienceActivityPostForm,
} from './../types/admin'
import { IThingsPostForm } from './../../views/admin/types/types'
import { Module } from 'vuex'
import { postAPI } from '../api/postAPI'
import { IRootStore } from '../models/appTypes'
import {
  FormType,
  IBeforeAfterPostForm,
  IErrorMessages,
  IPlantForm,
  ITechnologiesPostForm,
} from '../types/admin'
import { storeServises } from '../servises/storeServises'

interface IAdminSlice {
  errorMessages: IErrorMessages
  isAdminLoading: boolean
  formType: FormType
  navLinks: adminNavLink[]
}

const AdminSlice: Module<IAdminSlice, IRootStore> = {
  state: {
    errorMessages: {} as IErrorMessages,
    isAdminLoading: false,
    formType: undefined,
    navLinks: [
      { rus: 'Было / Стало', en: 'beforeAfterPostForm', id: '1' },
      { rus: 'Технологии', en: 'technologiesForm', id: '2' },
      { rus: 'Научная деятельность', en: 'scienceForm', id: '3' },
      { rus: 'Проект', en: 'studyProject', id: '4' },
      { rus: 'Дела', en: 'thingsForm', id: '5' },
      { rus: 'Растения', en: 'plantForm', id: '6' },
    ],
  },
  getters: {
    errorMessages(state) {
      return state.errorMessages
    },
    adminLoading(state) {
      return state.isAdminLoading
    },
    formType(state) {
      return state.formType
    },
    navLinks(state) {
      return state.navLinks
    },
  },
  mutations: {
    setErrorMessages(state, payload: IErrorMessages) {
      state.errorMessages = payload
    },
    setAdminLoading(state, payload: boolean) {
      state.isAdminLoading = payload
    },
    setFormType(state, payload: FormType) {
      state.formType = payload
    },
  },
  actions: {
    async addBeforeAfterPost({ commit, rootState }, payload: IBeforeAfterPostForm) {
      commit('setAdminLoading', true)
      const response = await postAPI.postBeforeAfterPostData(payload, rootState.token)
      storeServises.postFormCommits(response, commit)
    },
    async addPlant({ commit, rootState }, payload: IPlantForm) {
      commit('setAdminLoading', true)
      const response = await postAPI.postPlantData(payload, rootState.token)
      storeServises.postFormCommitsWithImg(response, commit)
    },
    async addTechnologyPost({ commit, rootState }, payload: ITechnologiesPostForm) {
      commit('setAdminLoading', true)
      const response = await postAPI.postTechnologiesPostData(payload, rootState.token)
      storeServises.postFormCommits(response, commit)
    },
    async addThingsPost({ commit, rootState }, payload: IThingsPostForm) {
      commit('setAdminLoading', true)
      const response = await postAPI.postThingsPostData(payload, rootState.token)
      storeServises.postFormCommits(response, commit)
    },
    async addProjectPost({ commit, rootState }, payload: IProjectPostForm) {
      commit('setAdminLoading', true)
      const response = await postAPI.postProjectPostData(payload, rootState.token)
      storeServises.postFormCommits(response, commit)
    },
    async addScienceActivityPost({ commit, rootState }, payload: IScienceActivityPostForm) {
      commit('setAdminLoading', true)
      const response = await postAPI.postScienceActivityPostData(payload, rootState.token)
      storeServises.postFormCommits(response, commit)
    },
  },
}

export default AdminSlice

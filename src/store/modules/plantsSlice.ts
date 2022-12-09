import router from '@/router'
import { Module } from 'vuex'
import { florotekaAPI } from '../api/api'
import { deleteAPI } from '../api/deleteAPI'
import { updateAPI, updateRequestData } from '../api/updateAPI'
import { IRootStore, plantPropsType } from '../models/appTypes'
import { deletePlantFormType } from '../models/formTypes'

export interface IPlantSlice {
  plants: plantPropsType[]
  plantsLoaded: boolean
  plantsFilterValue: string
  plantsFilterCanBuy: boolean
  activePlantId: string
}

const PlantSlice: Module<IPlantSlice, IRootStore> = {
  state: {
    plants: [],
    plantsLoaded: false,
    plantsFilterValue: '',
    plantsFilterCanBuy: false,
    activePlantId: '1',
  },
  getters: {
    filteredPlants(state) {
      return state.plants
        .filter((el) => el.name.toLowerCase().indexOf(state.plantsFilterValue.toLowerCase()) !== -1)
        .filter((el) => (state.plantsFilterCanBuy ? el.having : true))
    },
    activePlant: (state) => {
      return state.plants.find((el) => el.id === state.activePlantId)
    },
    randomPlants: (state) => (count: number) => {
      const reccomendations: plantPropsType[] = []
      for (let index = 0; index < count; index++) {
        let index = Math.floor((Math.random() * 100) % state.plants.length)
        while (reccomendations.find((el) => el.id === state.plants[index].id) !== undefined) {
          index = Math.floor((Math.random() * 100) % state.plants.length)
        }
        reccomendations.push(state.plants[index])
      }
      return reccomendations
    },
    plantsFilterValue: (state) => {
      return state.plantsFilterValue
    },
    plantsFilterCanBuy: (state) => {
      return state.plantsFilterCanBuy
    },
    plantsLoaded: (state) => {
      return state.plantsLoaded
    },
  },
  mutations: {
    setPlants(state, payload) {
      state.plants = payload
    },
    setplantsLoaded(state, payload: boolean) {
      state.plantsLoaded = payload
    },
    setPlantsFilterValue(state, payload: string) {
      state.plantsFilterValue = payload
    },
    setActivePlant(state, payload: string) {
      state.activePlantId = payload
    },
    setPlantsFilterCanBuy(state, payload: boolean) {
      state.plantsFilterCanBuy = payload
    },
  },
  actions: {
    async setPlants({ commit }) {
      commit('setPlants', [])
      commit('setplantsLoaded', false)
      const data = await florotekaAPI.fetchPlantsData()
      commit('setPlants', data)
      commit('setplantsLoaded', true)
    },
    async deletePlant({ commit, state, rootState }, data: deletePlantFormType) {
      const returnData = await deleteAPI.deletePlant(data, rootState.token)
      if (returnData === 'ok') {
        const newState = state.plants.filter((el) => el.id !== data.id)
        router.push('./')
        commit('setPlants', newState)
        return 'ok'
      } else {
        return returnData
      }
    },
    async updatePlant({ rootState }, data: updateRequestData) {
      const returnData = await updateAPI.updatePlant(data, rootState.token)
      if (returnData === 'ok') return 'ok'
      return returnData
    },
  },
}

export default PlantSlice

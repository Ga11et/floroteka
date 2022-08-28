import { Module } from 'vuex'
import { florotekaAPI } from '../api/api'
import { GaleryPhotoType, IRootStore } from '../models/appTypes'

interface IGalerySlice {
  photos: GaleryPhotoType[]
  galeryLoaded: boolean
}

const GalerySlice: Module<IGalerySlice, IRootStore> = {
  state: {
    galeryLoaded: false,
    photos: []
  },
  getters: {
    photos: (state) => {
      return state.photos.sort((prev, next) => {
        return next.lastModified < prev.lastModified ? -1 : 1
      })
    },
    galeryLoaded (state) {
      return state.galeryLoaded
    }
  },
  mutations: {
    setPhotos (state, payload: GaleryPhotoType[]) {
      state.photos = payload
    },
    setLoaded (state, payload: boolean) {
      state.galeryLoaded = payload
    }
  },
  actions: {
    async getGalery ({ commit }) {
      commit('setPhotos', [])
      commit('setLoaded', false)
      const returnData = await florotekaAPI.fetchGalery()
      commit('setPhotos', returnData)
      commit('setLoaded', true)
    }
  }
}

export default GalerySlice

import Vue from 'vue'
import Vuex from 'vuex'
import { plantPropsType } from './models'
import plantImg from '../assets/flower.jpg'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plants: [
      { id: '1', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' },
      { id: '2', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' },
      { id: '3', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' },
      { id: '4', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' },
      { id: '5', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' },
      { id: '6', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' }
    ] as plantPropsType[]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

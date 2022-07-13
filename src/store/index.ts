import Vue from 'vue'
import Vuex from 'vuex'
import { beforeAfterPostPropsType, plantPropsType } from './models'
import plantImg from '../assets/flower.jpg'
import beforeTestImg from '../assets/beforeTest.jpg'
import afterTestImg from '../assets/afterTest.jpg'

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
    ] as plantPropsType[],
    beforeAfterPosts: [
      { id: '1', heading: 'Заголовок', date: '13.07.2022', text: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."', after: beforeTestImg, before: afterTestImg },
      { id: '2', heading: 'Заголовок', date: '13.07.2022', text: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."', after: beforeTestImg, before: afterTestImg },
      { id: '3', heading: 'Заголовок', date: '13.07.2022', text: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."', after: beforeTestImg, before: afterTestImg },
      { id: '4', heading: 'Заголовок', date: '13.07.2022', text: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."', after: beforeTestImg, before: afterTestImg }
    ] as beforeAfterPostPropsType[]
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

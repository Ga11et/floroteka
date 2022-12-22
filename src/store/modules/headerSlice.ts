import { Module } from 'vuex'
import { IRootStore } from '../models/appTypes'
import { INavHeader } from '../types/header'

interface IHeaderSlice {
  nav: INavHeader[]
}

const HeaderSlice: Module<IHeaderSlice, IRootStore> = {
  state: {
    nav: [
      { id: '1', en: '/', ru: 'Каталог' },
      { id: '2', en: '/news', ru: 'Новости' },
      {
        id: '3',
        en: '',
        ru: 'Категории',
        children: [
          {
            id: '5',
            en: '/beforeafter',
            ru: 'Было / Стало',
          },
          {
            id: '6',
            en: '/technologies',
            ru: 'Технологии',
          },
          {
            id: '7',
            en: '/science',
            ru: 'Экспериментальная деятельность',
          },
          {
            id: '8',
            en: '/things',
            ru: 'Дела',
          },
          {
            id: '9',
            en: '/studyProjects',
            ru: 'Проекты',
          },
        ],
      },
      { id: '4', en: '/galery', ru: 'Галерея' },
    ],
  },
  getters: {
    getHeaderNav(state) {
      return state.nav
    },
  },
  mutations: {},
  actions: {},
}

export default HeaderSlice

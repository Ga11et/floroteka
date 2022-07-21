import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import NewsView from '../views/NewsView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: NewsView
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import(/* webpackChunkName: "about" */ '../views/CatalogView.vue')
  },
  {
    path: '/science',
    name: 'science',
    component: () => import(/* webpackChunkName: "about" */ '../views/ScienceActivityView.vue')
  },
  {
    path: '/beforeAfter',
    name: 'beforeAfter',
    component: () => import(/* webpackChunkName: "about" */ '../views/BeforeAfterView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/PlantAddingForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import CatalogView from '../views/CatalogView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: CatalogView
  },
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewsView.vue')
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
  },
  {
    path: '/plant',
    name: 'plant',
    component: () => import(/* webpackChunkName: "about" */ '../views/PlantInfoView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

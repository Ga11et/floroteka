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
    path: '/technologies',
    name: 'technologies',
    component: () => import(/* webpackChunkName: "about" */ '../views/TechnologiesView.vue')
  },
  {
    path: '/things',
    name: 'things',
    component: () => import(/* webpackChunkName: "about" */ '../views/ThingsView.vue')
  },
  {
    path: '/galery',
    name: 'galery',
    component: () => import(/* webpackChunkName: "about" */ '../views/GaleryView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
  },
  {
    path: '/plant',
    name: 'plant',
    component: () => import(/* webpackChunkName: "about" */ '../views/PlantInfoView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewsView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

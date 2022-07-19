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

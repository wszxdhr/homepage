import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pdf from '../views/PDF.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pdf',
    name: 'Pdf',
    component: Pdf
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
//import { authGuard } from "../auth/authGuard"; // Uncomment this when you have a page you require to be authenticated

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue')
    //,beforeEnter: authGuard //add this line to require the user to e authenticated in order to access
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue')
    //,beforeEnter: authGuard //add this line to require the user to e authenticated in order to access
  },
  {
    path: '/topic/:id',
    name: 'Topic',
    component: () => import('../views/SelectedTopic.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/browse/',
    name: 'BrowseCategory',
    component: () => import('../views/BrowseCategories.vue'),
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('../views/SelectedCategory.vue'),
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router

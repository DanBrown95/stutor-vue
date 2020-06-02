import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@okta/okta-vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/implicit/callback', 
    component: Auth.handleCallback()
  },
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue')
  },
  {
    path: '/topic/:id',
    name: 'Topic',
    component: () => import('../views/SelectedTopic.vue'),
    meta: {
      requiresAuth: true
    },
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

Vue.use(Auth, {
  issuer: 'https://dev-870310.okta.com/oauth2/default',
  clientId: '0oadanvcnLEDKn50V4x6',
  redirectUri: 'http://localhost:8080/implicit/callback',
  scopes: ['openid', 'profile', 'email', 'phone'],
  pkce: true
})

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router

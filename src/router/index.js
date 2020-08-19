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
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue'),
    meta: {
      requiresAuth: false
    },
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
    path: '/browse',
    name: 'BrowseCategory',
    component: () => import('../views/BrowseCategories.vue'),
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('../views/SelectedCategory.vue'),
  },
  {
    path: '/expert/register',
    name: 'ExpertRegistration',
    component: () => import('../views/expert/Register.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/contactUs',
    name: 'ContactUs',
    component: () => import('../views/shared/ContactUs.vue'),
  },
  {
    path: '/legal/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/legal/PrivacyPolicy.vue'), 
  },{
    path: '/legal/terms-of-use',
    name: 'TermsOfUse',
    component: () => import('../views/legal/TermsOfUse.vue'),
  },{
    path: '/user/order-history',
    name: 'OrderHistory',
    component: () => import('../views/user/OrderHistory.vue'),
    meta: {
      requiresAuth: true
    },
  },{
    path: '/resources/topic-request',
    name: 'TopicRequest',
    component: () => import('../views/topic/Request.vue'),
    meta: {
      requiresAuth: true
    },
  },{
    path: '/expert/acknowledge',
    name: 'Acknowledge',
    component: () => import('../views/expert/Acknowledgement.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

Vue.use(Auth, {
  issuer: 'https://dev-870310.okta.com/oauth2/default',
  clientId: '0oap3ngm4mAP0SOV34x6',
  redirectUri: 'http://localhost:8080/implicit/callback',
  scopes: ['openid', 'profile', 'email', 'phone', 'groups'],
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

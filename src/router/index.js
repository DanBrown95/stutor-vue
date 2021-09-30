import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/topic/:id',
    name: 'Topic',
    component: () => import('../views/SelectedTopic.vue'),
    beforeEnter: authGuard,
    meta: {
      colorNav: true
    },
  },
  {
    path: '/browse',
    name: 'BrowseCategory',
    component: () => import('../views/category/BrowseCategories.vue'),
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('../views/category/SelectedCategory.vue'),
  },
  {
    path: '/expert/register',
    name: 'ExpertRegistration',
    component: () => import('../views/expert/Register.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/contactUs',
    name: 'ContactUs',
    component: () => import('../views/shared/ContactUs.vue'),
    meta: {
      colorNav: true
    }
  },
  {
    path: '/legal/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/legal/PrivacyPolicy.vue'),
    meta: {
      colorNav: true
    }
  },{
    path: '/legal/terms-of-use',
    name: 'TermsOfUse',
    component: () => import('../views/legal/TermsOfUse.vue'),
    meta: {
      colorNav: true
    }
  },{
    path: '/user/order-history',
    name: 'OrderHistory',
    component: () => import('../views/user/OrderHistory.vue'),
    meta: {
      colorNav: true
    },
    beforeEnter: authGuard
  },{
    path: '/resources/topic-request',
    name: 'TopicRequest',
    component: () => import('../views/topic/Request.vue'),
    beforeEnter: authGuard
  },{
    path: '/expert/acknowledge',
    name: 'Acknowledge',
    component: () => import('../views/expert/Acknowledgement.vue'),
    meta: {
      colorNav: true
    },
    beforeEnter: authGuard
  },{
    path: '/user/account',
    name: 'UserAccount',
    component: () => import('../views/user/Account.vue'),
    meta: {
      colorNav: true
    },
    beforeEnter: authGuard
  },{
    path: '/shared/verification-error',
    name: 'VerificationError',
    component: () => import('../views/shared/VerificationError.vue')
  },{
    path: '/careers',
    name: 'Careers',
    component: () => import('../views/company/Careers.vue')
  },
  {
    path: '/unverified',
    name: 'unverified',
    component: () => import('../views/shared/EmailUnverified.vue'),
    meta: {
      colorNav: true
    },
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router

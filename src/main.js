import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VuejsDialog from "vuejs-dialog"

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.config.productionTip = false
Vue.use(VuejsDialog);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

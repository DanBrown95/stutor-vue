import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VuejsDialog from "vuejs-dialog"
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

const apolloClient = new ApolloClient({
  uri: 'https://localhost:44343/graphql'
})

Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false
Vue.use(VuejsDialog);

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')

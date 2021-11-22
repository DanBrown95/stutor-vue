<template>
  <v-app>
    <v-content>
      <TopNav :class="{ 'color-nav': colorNav }"/>
      <router-view :key="$route.fullPath"></router-view>
      <v-snackbar :app="true" v-model="hasIncompleteOrders" bottom right color="red" :timeout="snackbarTimeout">
        URGENT: You have incomplete orders waiting to be acknowledged.
          <v-btn
            @click="redirectToOrders"
            color="white"
          >
            Acknowledge Orders
          </v-btn>
          <v-btn
            @click="hasIncompleteOrders = false"
            class="ma-2"
            text
            icon
          >
            <v-icon title="close" right>mdi-close</v-icon>
          </v-btn>
      </v-snackbar>

    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import TopNav from '@/components/shared/TopNav.vue'
import Footer from '@/components/shared/Footer.vue'
import { HasIncompleteOrders as _expertRepo_HasIncompleteOrders } from '@/store/expert/repository.js'

export default {
  name: "App",
  components: {
    TopNav,
    Footer
  },
  data: function () {
    return { 
      colorNav: true,
      hasIncompleteOrders: false,
      snackbarTimeout: 0
    }
  },
  mounted() {
    this.checkForIncompleteOrders()
  },
  watch: {
    // Everytime the route changes, check for auth status
    '$route'() {
      this.colorNav = (this.$route.meta.colorNav === true);
    },
    '$auth.user'() {
      this.checkForIncompleteOrders();
    }
  },
  methods: {
    async checkForIncompleteOrders(){
      if(this.$auth.user && this.$auth.user['https://stutor.com/roles'] != null){ // If logged in
        if(this.$auth.user['https://stutor.com/roles'].map((a) => { return a.toLowerCase() }).includes('expert')){ // If expert
          const accessToken = await this.$auth.getTokenSilently();
          this.hasIncompleteOrders = await _expertRepo_HasIncompleteOrders(this.$auth.user['https://stutor.com/id'], accessToken);
        }
      }
    },
    redirectToOrders: function() {
      this.hasIncompleteOrders = false;
      this.$router.push({name: "Acknowledge"});
    }
  }
};
</script>

<style scoped>
</style>
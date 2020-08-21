<template>
  <v-app>
    <TopNav :class="{ 'color-nav': colorNav }"/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import TopNav from '@/components/shared/TopNav.vue'
import Footer from '@/components/shared/Footer.vue'

export default {
  name: "App",
  components: {
    TopNav,
    Footer
  },
  data: function () {
    return { 
      authenticated: false, 
      user: {},
      colorNav: true
    }
  },
  created () { this.isAuthenticated() },
  watch: {
    // Everytime the route changes, check for auth status
    '$route'() {
      this.isAuthenticated();
      this.colorNav = (this.$route.meta.colorNav === true);
    }    
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated();
      this.getUser();
    },
    async getUser() {
      //this.user = await this.$auth.getUser()
      const accessToken = await this.$auth.getAccessToken();
      this.user = await this.$auth.getUser(accessToken);
    }
  }
};
</script>

<style scoped>
</style>
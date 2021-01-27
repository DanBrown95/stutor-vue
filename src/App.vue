<template>
  <v-app>
    <TopNav :class="{ 'color-nav': colorNav }"/>
    <v-content>
      <router-view :user="user"></router-view>
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
      user: {},
      colorNav: true
    }
  },
  watch: {
    // Everytime the route changes, check for auth status
    '$route'() {
      this.getUser();
      this.colorNav = (this.$route.meta.colorNav === true);
    }
  },
  computed: {
    authenticated: function() {
      return this.user != null && this.user != {};
    }
  },
  methods: {
    async getUser() {
      this.user = this.$auth.user;
    }
  }
};
</script>

<style scoped>
</style>
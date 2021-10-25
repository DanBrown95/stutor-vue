<template>
  <v-app>
    <v-content>
      <TopNav :class="{ 'color-nav': colorNav }"/>
      <router-view :key="$route.fullPath"></router-view>
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
      colorNav: true
    }
  },
  watch: {
    // Everytime the route changes, check for auth status
    '$route'() {
      this.colorNav = (this.$route.meta.colorNav === true);
    }
  }
};
</script>

<style scoped>
</style>
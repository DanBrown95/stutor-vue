<template>
  <v-app>
    <TopNav />
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
  data(){
    return {
    }
  },
};
</script>

<style scoped>
</style>
<template>
  <v-app>
    <TopNav />
    <v-content>
      <router-view></router-view>
    </v-content>
    
  </v-app>
</template>

<script>
import TopNav from '@/components/shared/TopNav.vue'

export default {
  name: "App",
  components: {
    TopNav
  },
  data(){
    return {
    }
  },
};
</script>

<style scoped>
</style>
<template>
  <div class="main">
    <div class="banner">
      <h2>Stutor</h2>
      <Search class="search"/>
    </div>

    <Categories />

  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/main/Search.vue'
import Categories from '@/components/main/Categories.vue'

export default {
  name: 'Main',
  components: {
    Search,
    Categories
  }
}
</script>

<style scoped>
.banner {
  height: 530px;
  width: 100vw;
  background-image: url("../assets/SearchBanner.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

h2 {
  margin: auto;
  width: 40%;
  position: relative;
  top: 40%;
  text-align: center;
  font-size: 4em;
  color: grey;
}
</style>
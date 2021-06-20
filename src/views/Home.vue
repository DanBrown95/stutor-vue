<template>
  <div class="main">
    <div class="banner">
      <h2>Get help with any project</h2>
      <Search class="search"/>
    </div>

    <PopularCategories />

  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/home/Search.vue'
import PopularCategories from '@/components/home/PopularCategories.vue'

export default {
  name: 'Home',
  components: {
    Search,
    PopularCategories
  }
}
</script>

<style scoped>
.banner {
  height: 700px;
  width: 100vw;
  background-image: url("../assets/SearchBanner.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.search {
  top: 50%;
  margin: auto;
  width: 40%;
}

h2 {
  margin: auto;
  width: 40%;
  position: relative;
  top: 47%;
  text-align: center;
  font-family: 'Lawyer Gothic';
  font-size: 3em;
  color: #D0021B;
}

@media only screen and (max-width: 1265px) {
  h2 { 
      font-size: 1.8em; 
  }
}
</style>
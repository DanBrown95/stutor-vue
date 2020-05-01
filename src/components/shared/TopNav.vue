<template>
    <div id="nav">
        <nav class="navbar navbar-dark bg-dark">
            <div class="inline-block">
                <a href="/">
                    <img src="https://a.storyblok.com/f/39898/1024x1024/dea4e1b62d/vue-js_logo-svg.png" height="40" width="40">
                </a>
            </div>

            <!-- Login/Logout buttons -->
            <div id="auth" class="inline-block" v-if="!$auth.loading">
                <!-- show login when not authenticated -->
                <v-btn class="ma-2 btn-login" rounded color="white" v-if="!$auth.isAuthenticated" @click="login">Log in</v-btn>
                <!-- show logout when authenticated -->
                <div v-if="$auth.isAuthenticated">
                    <!-- <v-img :src="$auth.user.picture" width="30" height="30"> -->
                    <span id="txtUser" class="text-muted font-weight-medium px-2">{{$auth.user.name}}</span>
                    <v-btn class="ma-2" tile outlined small color="white" @click="logout">Log out</v-btn>
                </div>
            </div>
        </nav>
        <!-- <router-link to="/">Stutor</router-link> -->
    </div>
</template>

<script>
export default {
  name: "TopNav",
  data(){
    return {
    }
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style scoped>
    .inline-block {
        display: inline-block;
    }

    #auth {
        margin: .5em 1em 0px 0px;
        float: right;
    }

    #nav {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 3em;
    }

    #txtUser {
      color: white;
    }

</style>
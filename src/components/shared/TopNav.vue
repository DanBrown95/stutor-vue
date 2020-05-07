<template>
    <div id="nav">
        <nav class="navbar navbar-dark bg-dark">
            <div class="inline-block">
                <a href="/">
                    <img class="logo" src="@/assets/logos/logo_text_red_transparent.png" height="40" width="90">
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

    .logo{
      margin: 1em 0px 1em 1em;
    }

</style>
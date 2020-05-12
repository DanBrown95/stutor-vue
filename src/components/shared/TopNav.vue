<template>
    <div id="nav">
        <nav class="navbar navbar-dark bg-dark">
            <div class="inline-block logo">
                <a href="/">
                    STUTOR
                </a>
            </div>

            <!-- Login/Logout buttons -->
            <div id="auth" class="inline-block" v-if="!$auth.loading">
                <!-- show login when not authenticated -->
                <v-btn class="ma-2 btn-login" rounded color="white" v-if="!$auth.isAuthenticated" @click="login">Log in</v-btn>
                <!-- show logout when authenticated -->
                <div v-if="$auth.isAuthenticated">
                    <!-- <v-img :src="$auth.user.picture" width="30" height="30"> -->
                    <div class="user-dropdown">
                      <span id="txtUser" class="text-muted font-weight-medium px-2">{{$auth.user.name}}</span>
                      <div class="user-dropdown-content">
                        <div class="top-row">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <img v-on="on" v-bind:src="$auth.user.picture">
                            </template>
                            <span>{{$auth.user.email}}</span>
                          </v-tooltip>
                          <a href="#">Account</a>
                        </div>
                        <a href="#">Payment</a>
                        <a href="#">Preferences</a>
                      </div>
                    </div>
                    <v-btn class="ma-2" tile outlined small color="white" @click="logout">Log out</v-btn>
                </div>
            </div>
        </nav>
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
    height: 4em;
  }

  #txtUser {
    color: white;
    padding-bottom: 13px;
  }

  @font-face {
    font-family: 'Android';
    src: url('../../assets/fonts/syntha.ttf');
  }

  .logo {
    margin: 1em 0 0 1em;
  }

  .logo a{
    font-size: 25px;
    color: #D0021B;
    font-family: 'Android';
    font-weight: bold;
    text-decoration: none;
  }

  .user-dropdown {
    position: relative;
    display: inline-block;
  }
  
  .top-row img{
    margin-right: 10px;
    float: left;
  }

  .top-row a {
    text-align: center;
  }

  .user-dropdown-content {
    display: none;
    margin-top: 10px;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 5%;
    z-index: 1;
  }

  .user-dropdown-content a {
    color: black;
    padding: 14px 16px;
    text-decoration: none;
    display: block;
  }

  /* Top link (rounded top right corner) */
  .user-dropdown-content .top-row a:hover {background-color: #ddd; border-radius:0 11% 0 0;}

  /* Last link (rounded bottom corners) */
  .user-dropdown-content > a:hover:last-child {background-color: #ddd; border-radius:0 0 11% 11%;}

  /* Links inbetween (no rounded corners) */
  .user-dropdown-content a:hover:not(:last-child) {background-color: #ddd;}

  .user-dropdown:hover .user-dropdown-content {display: block;}

  .user-dropdown:hover #txtUser {color: bisque;}
</style>
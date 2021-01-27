<template>
    <div id="nav">
        <nav class="navbar navbar-dark bg-dark">
            <div class="inline-block logo">
                <a href="/">
                    STUTOR
                </a>
            </div>

            <!-- Login/Logout buttons -->
            <div id="auth" class="inline-block" >
                <!-- show login when not authenticated -->
                
                <v-progress-circular
                  v-if="$auth.loading"
                  indeterminate
                  color="primary"
                ></v-progress-circular>

                <v-btn class="ma-2 btn-login" v-if="!$auth.isAuthenticated && !$auth.loading" rounded color="white" @click="login">Log in</v-btn>
                <!-- show logout when authenticated -->
                <div v-if="$auth.isAuthenticated && !$auth.loading">
                    <!-- <v-img :src="$auth.user.picture" width="30" height="30"> -->
                    <div class="user-dropdown">
                      <span id="txtUser" class="text-muted font-weight-medium px-2">
                        {{$auth.user['https://stutor.com/firstname'] + ' ' + $auth.user['https://stutor.com/lastname']}} 
                      </span>
                      <div class="user-dropdown-content">
                        <div class="top-row">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <!-- <img v-on="on" v-bind:src="$parent.$parent.user.picture"> -->
                              <img v-on="on" src="../../assets/user-icon.png">
                            </template>
                            <span>{{$auth.user.email}}</span>
                          </v-tooltip>
                          <router-link :to="{name: 'UserAccount'}">Account</router-link>
                        </div>
                        <router-link :to="{name: 'OrderHistory'}">Order History</router-link>
                        <router-link v-if="isExpert" :to="{name: 'Acknowledge'}">Acknowledge</router-link>
                      </div>
                    </div>
                    <v-btn id="btnLogout" class="ma-2" tile outlined small @click="logout">Log out</v-btn>
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
    login () {
      this.$auth.loginWithRedirect();
    },
    async logout () {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  },
  computed: {
    isExpert: function() {
      if(this.$auth.user['https://stutor.com/roles'] != null){
        return this.$auth.user['https://stutor.com/roles'].map((a) => { return a.toLowerCase() }).includes('expert');
      }
      return false;
    }
  }
};
</script>

<style scoped>

  /* colored variant */

  .color-nav #txtUser {
    color: #DEA800;
  }

  .color-nav #btnLogout {
    color: #DEA800;
  }

  .color-nav .user-dropdown:hover #txtUser {color: rgb(199, 174, 36);} 

  /* Transparent Variant */

  .inline-block {
      display: inline-block;
  }

  #auth {
      margin: .5em 1em 0px 0px;
      float: right;
  }

  #btnLogout {
    color: white;
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
    height: 52px;
    width: 52px;
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
  .user-dropdown-content .top-row a:hover {background-color: #ddd; border-radius:11% 11% 0 0;}

  /* Last link (rounded bottom corners) */
  .user-dropdown-content > a:hover:last-child {background-color: #ddd; border-radius:0 0 11% 11%;}

  /* Links inbetween (no rounded corners) */
  .user-dropdown-content a:hover:not(:last-child) {background-color: #ddd;}

  .user-dropdown:hover .user-dropdown-content {display: block;}

  .user-dropdown:hover #txtUser {color: bisque;}
</style>
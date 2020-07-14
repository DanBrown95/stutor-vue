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
                <v-btn class="ma-2 btn-login" v-if="!$parent.$parent.authenticated" rounded color="white" @click="login">Log in</v-btn>
                <!-- show logout when authenticated -->
                <div v-if="$parent.$parent.authenticated">
                    <!-- <v-img :src="$auth.user.picture" width="30" height="30"> -->
                    <div class="user-dropdown">
                      <span id="txtUser" class="text-muted font-weight-medium px-2">{{$parent.$parent.user.name}}</span>
                      <div class="user-dropdown-content">
                        <div class="top-row">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <!-- <img v-on="on" v-bind:src="$parent.$parent.user.picture"> -->
                              <img v-on="on" src="../../assets/user-icon.png">
                            </template>
                            <span>{{$parent.$parent.user.email}}</span>
                          </v-tooltip>
                          <a href="#">Account</a>
                        </div>
                        <router-link :to="{name: 'OrderHistory', params: { userId: $parent.$parent.user.sub }}">Order History</router-link>
                        <a href="#">Preferences</a>
                      </div>
                    </div>
                    <v-btn id="btnLogout" class="ma-2" tile outlined small color="white" @click="logout">Log out</v-btn>
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
      this.$auth.loginRedirect()
    },
    async logout () {
      await this.$auth.logout()

      // Navigate back to home
      this.$router.push({ path: '/' })
    }
  },
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
  .user-dropdown-content .top-row a:hover {background-color: #ddd; border-radius:0 11% 0 0;}

  /* Last link (rounded bottom corners) */
  .user-dropdown-content > a:hover:last-child {background-color: #ddd; border-radius:0 0 11% 11%;}

  /* Links inbetween (no rounded corners) */
  .user-dropdown-content a:hover:not(:last-child) {background-color: #ddd;}

  .user-dropdown:hover .user-dropdown-content {display: block;}

  .user-dropdown:hover #txtUser {color: bisque;}
</style>
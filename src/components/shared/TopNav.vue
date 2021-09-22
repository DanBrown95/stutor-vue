<template>
  <div>
      <v-app-bar absolute color="transparent" flat>
        <v-app-bar-nav-icon @click="drawer = true" id="nav-menu-expander"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" class="inline-block logo">
              STUTOR
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div id="static-nav">
          <div id="auth">
            
                <v-progress-circular
                  v-if="$auth.loading"
                  indeterminate
                  color="primary"
                ></v-progress-circular>

                <v-btn class="ma-2 btn-login" v-if="!$auth.isAuthenticated && !$auth.loading" rounded color="white" @click="login">Log in</v-btn>
                <div v-if="$auth.isAuthenticated && !$auth.loading">
                    <div class="user-dropdown">
                      <span id="txtUser" class="text-muted font-weight-medium px-2">
                        {{$auth.user['https://stutor.com/firstname'] + ' ' + $auth.user['https://stutor.com/lastname']}} 
                      </span>
                      <div class="user-dropdown-content">
                        <div class="top-row">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
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
        </div>
      </v-app-bar>

      <!-- Code for nav modal -->
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" id="toolbar-nav">
            <div v-if="$auth.isAuthenticated && !$auth.loading" style="padding: 15% 0; text-align: center;">
              <h4 >{{$auth.user.email}}</h4>
            </div>

            <div v-if="!$auth.isAuthenticated && !$auth.loading" style="padding: 15% 0;">
              <v-list-item style="background-color: #3eff3e7a" @click="login">
                <v-list-item-icon>
                  <v-icon>mdi-login</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item>
            </div>
            
            <div v-if="$auth.isAuthenticated && !$auth.loading">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title><router-link :to="{name: 'UserAccount'}">Account</router-link></v-list-item-title>
              </v-list-item>

              <v-list-item v-if="isExpert">
                <v-list-item-icon>
                  <v-icon>mdi-check-all</v-icon>
                </v-list-item-icon>
                <v-list-item-title><router-link :to="{name: 'Acknowledge'}">Acknowledge</router-link></v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-clipboard-text-search-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title><router-link :to="{name: 'OrderHistory'}">Order History</router-link></v-list-item-title>
              </v-list-item>

              <v-list-item style="background-color: #f91212d6;" @click="logout">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </div>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "TopNav",
  data(){
    return {
      drawer: false,
      group: null,
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

  /* New nav styles */

  #toolbar-nav a {
    text-decoration: none;
    color: unset;
  }

  #static-nav {
    float: right;
  }

  /* colored variant */

  .color-nav #txtUser {
    color: #DEA800;
  }

  .color-nav #btnLogout {
    color: #DEA800;
  }

  .color-nav .user-dropdown:hover #txtUser {color: rgb(199, 174, 36);} 

  /* Transparent Variant */

  #btnLogout {
    color: white;
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

  @media screen and (max-width: 700px) {
    #nav-menu-expander {
      display: block;
    }
    #static-nav {
      display: none;
    }
  }

  @media screen and (min-width: 700px) {
    #nav-menu-expander {
      display: none;
    }
    #static-nav {
      display: block;
    }
  }

</style>
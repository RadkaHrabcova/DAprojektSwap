<template>
  <div class="navbar">
    <v-card
    class="mx-auto overflow-hidden"
    min-height="100vh"
    min-width="344"
  >
    <v-system-bar color="light-green darken-4"></v-system-bar>

    <v-app-bar
      color="light-green darken-3"
      dark
      prominent
      max-height="80"
    >
      <v-toolbar-title id="logo">SWAPITO</v-toolbar-title>
      
      <div class="icons">
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>

        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </div>


    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      right
      temporary
    >
      <v-list
        nav
        rounded

      >
        <v-list-item-group
          v-model="group"
          active-class="light-green--text text--accent-4"
        >

          <v-list-item>
            <v-list-item-title>
              <router-link to="/">Domů</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <router-link to="/profile" v-if="userIsSignedIn">Profil</router-link>
              <router-link to="/login" v-else>Přihlásit se</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <router-link to="/form" v-if="userIsSignedIn">Přidej inzerát</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-btn
            class="ma-2"
            outlined
            color="gray"
            v-if="userIsSignedIn" @click="signOut"
            >Odhlásit se
            </v-btn>

          <v-list-item>
            <v-list-item-title>
              <router-link to="/privacy">Ochrana soukromí</router-link>
            </v-list-item-title>
          </v-list-item>
           
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "Navbar",

  data(){
    return{
      user: null,
      userIsSignedIn: false,
      drawer: false,
      group: null,
    }
  },

  watch: {
      group () {
        this.drawer = false
      },
    },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.userIsSignedIn = true;
      }
    });
  },

  methods: {
    signOut() {
      firebase.auth().signOut();
      this.userIsSignedIn = false;
      this.$router.push({
        name: "Login"
      });
    }
  }
};
</script>

<style>
.navbar{
  max-height: 120px;
  padding-bottom: 20px;
}

.v-sheet.v-card:not(.v-sheet--outlined){
  box-shadow: none !important; 
}

.v-toolbar__content{
  justify-content: space-between;
}

#logo{
  align-self: flex-start;
  padding-top: 20px;
}

.icons{
  padding-top: 16px;
}

</style>

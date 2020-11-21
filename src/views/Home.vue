<template>
  <div class="home">
      <p>home swapito</p>
      <router-link to="/form">přidej inzerát</router-link>
      <br/>
      <br/>
      <button v-if="userIsSignedIn" @click="signOut">Odhlásit se</button>
      <router-link to="/profile" v-if="userIsSignedIn">profil</router-link>
      <router-link to="/login" v-else>Přihlásit se</router-link>
      <br/>
      <br/>
      <router-link to="/allAds"><button>Zobraz všechny inzeráty</button></router-link>
    
</div>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "Home",

      data() {
       return {
           user: null,
           userIsSignedIn: false,
        };
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
        this.$router.push({
            name: "Login"
        });
    }
  }
}
</script>

<style>
 
</style>
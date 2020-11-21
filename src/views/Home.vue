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
      
      <v-card-text>
        <p>Swapito homepage</p>  
      <router-link to="/allAds">Zobraz všechny inzeráty</router-link>
    </v-card-text>
    
  </div>
</template>

<script>


export default {
  name: "Home",

};
</script>

<style></style>

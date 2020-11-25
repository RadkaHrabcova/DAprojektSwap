<template>
  <div class="login">
    <h2>Přihlášení nebo registrace</h2>
    <div id="firebaseui-auth-container" class="login-ui"></div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Login",
  data() {
    return {
      user: null,
      userID: null,
      userName: null,
      userEmail: null,
      userPhoto: null,
      userLocation: null,
      userSearches: null,
      userOffers: null,
    };
  },

  methods:{
    createNewUser(){
      firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.userID = user.uid;
        this.userName = user.displayName;
        this.userEmail = user.email;
        this.userPhoto = user.photoURL;
      }
      fetch("https://beta-swapito-main-sv1kp3pz6lex.herokuapp.com/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: this.userID,
          userName: this.userName,
          userEmail: this.userEmail,
          userPhoto: this.userPhoto,
          location: this.userLocation,
          searches: this.userSearches,
          offers: this.userOffers
          }),
        })
      })
    console.log('new', this.firstSignIn);
    },
  },

  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    };
    ui.start("#firebaseui-auth-container", uiConfig);
    this.createNewUser();
  }
};
</script>

<style>
.login-ui{
  margin-top: 50px !important;
}
</style>

<template>
  <div class="profile" v-if="user">
  <v-row justify="center">
    <v-col
      cols="12"
      sm="8"
    >
      <v-card>
        <v-card-title class="light-green darken-2">
          <span class="headline white--text">{{ userName }}</span>

          <v-spacer></v-spacer>

          <v-btn
            light
            icon
          >
            <router-link to="/profileUpdate">
              <v-icon>mdi-pencil</v-icon>
            </router-link> 
          </v-btn>

        </v-card-title>

        <v-img
          :src="userPhoto"
          contain
          lazy-src="../assets/placeholder_profile_img.png"
          max-height="130px"
        >
        </v-img>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{userEmail}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{userLocation}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-card>
    </v-col>
  </v-row>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "Profile",
  data() {
    return {
      user: null,
      userID: null,
      userName: null,
      userEmail: null,
      userPhoto: null,
      userLocation: "Praha"
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.userID = user.uid;
        this.userName = user.displayName;
        this.userEmail = user.email;
        this.userPhoto = user.photoURL;

        fetch("http://127.0.0.1:5000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userID: this.userID,
            userName: this.userName,
            userEmail: this.userEmail,
            userPhoto: this.userPhoto
          })
        });
      }
    });
  }
};
</script>

<style lang="css" scoped>
.v-image{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

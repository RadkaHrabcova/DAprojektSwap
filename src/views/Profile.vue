<template>
  <div class="profile" v-if="user">
  <v-row justify="center">
    <v-col
      cols="12"
      sm="8"
    >
      <v-card>
        <v-card-title class="light-green darken-2">
          <span v-if="userName != null" class="headline white--text">{{ userName }}</span>
          <span v-else class="headline white--text">Uživatelský profil</span>

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
              <v-list-item-title >{{userEmail}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider
          v-if="userLocation != null"
           inset>
           </v-divider>

          <v-list-item
            v-if="userLocation != null"
          >
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

  <v-divider></v-divider>

  <h2>Moje inzeráty</h2>

  <v-row justify="center">
  <v-col
    v-for="ad in ads" :key="ad.id"
    cols="12"
    sm="8"
  >
    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="ad.picture"
      max-height="180px"
      contain
    ></v-img>

    <v-card-title
      id="element"
    >
      {{ad.name}}
    </v-card-title>

    <v-card-subtitle>
       {{ad.type}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="green darken-2"
        text
      >
        Detail inzerátu
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
        v-scroll-to="{ el: '#element', offset: 100 }"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ad.description}}
        </v-card-text>
      </div>
    </v-expand-transition>
    <v-divider></v-divider>
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
      userLocation: null,
      show: false,
      ads: []
    };
  },

  methods:{
    fetchAds() {
      fetch("http://127.0.0.1:5000/ads")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error("Něco je špatně");
          }
        })
        .then((json) => {
          this.ads = json;
        })
        .catch((error) => {
          this.ads = error;
        });
    },
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
    this.fetchAds();
  }
};
</script>

<style lang="css" scoped>
.v-image{
  margin-top: 20px;
  margin-bottom: 20px;
}

h2{
  margin-top: 30px;
}
</style>

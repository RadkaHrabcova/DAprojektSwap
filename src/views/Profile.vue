<template>
  <div class="profile" v-if="user">
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-card>
          <v-card-title class="white">
            <h2 v-if="object.userName != null">{{ object.userName }}</h2>
            <h2 v-else>Uživatelský profil</h2>

            <v-spacer></v-spacer>

            <v-btn light icon>
              <router-link to="/profileUpdate">
                <v-icon>mdi-pencil</v-icon>
              </router-link>
            </v-btn>
          </v-card-title>

          <v-img
            :src="object.userPhoto"
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
                <v-list-item-title>{{ object.userEmail }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider v-if="object.location != null" inset> </v-divider>

            <v-list-item v-if="object.location != null">
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ object.location }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider v-if="object.searches != null" inset> </v-divider>

            <v-list-item v-if="object.searches != null">
              <v-list-item-action>
                <v-icon>mdi-magnify</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ object.searches }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider v-if="object.offers != null" inset> </v-divider>

            <v-list-item v-if="object.offers != null">
              <v-list-item-action>
                <v-icon>mdi-hand-heart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ object.offers }}</v-list-item-title>
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
        v-for="ad in ads"
        :key="ad.id"
        cols="12"
        sm="8"
        class="col-padding"
      >
        <v-card
          v-if="ad.userID == userID"
          class="mx-auto ad-border"
          max-width="344"
        >
          <v-img
            :src="ad.picture"
            max-height="180px"
            contain
            class="img-margin"
          ></v-img>

          <v-card-title>
            {{ ad.name }}
          </v-card-title>

          <v-card-subtitle>
            {{ ad.type }}
          </v-card-subtitle>

          <v-btn color="green darken-2" text @click="show = !show">
            Detail inzerátu
          </v-btn>

          <v-card-text v-show="show">
            <p>{{ ad.description }}</p>
            <p><strong>Vyměním za: </strong> {{ ad.exchange }}</p>
            <div>
              <v-icon>mdi-map-marker</v-icon>
              <p>Lokalita: {{ ad.location }}</p>
            </div>
            <div v-if="userIsSignedIn">
              <v-icon>mdi-email</v-icon>
              <p>
                Kontakt: <strong> {{ ad.email }}</strong>
              </p>
            </div>
          </v-card-text>
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
      show: false,
      ads: [],
      object: {},
    };
  },

  methods: {
    fetchAds() {
      fetch("https://beta-swapito-main-sv1kp3pz6lex.herokuapp.com/ads")
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

    fetchProfile() {
      var user = firebase.auth().currentUser;

      if (user != null) {
        this.user = user;
        this.userID = user.uid;

        var path =
          "https://beta-swapito-main-sv1kp3pz6lex.herokuapp.com/user/" +
          user.uid;
        fetch(path)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw Error("Něco je špatně");
            }
          })
          .then((object) => {
            this.object = object;
          })
          .catch((error) => {
            this.user = error;
          });
      }
    },
  },

  created() {
    this.fetchProfile();
    this.fetchAds();
  },
};
</script>

<style lang="css" scoped>
.v-image {
  margin-top: 20px;
  margin-bottom: 20px;
}

h2 {
  margin-top: 30px;
}

.ad-border {
  border: 1px solid lightgrey;
  border-radius: 10px;
  margin-bottom: 10px;
}

.img-margin {
  margin-top: 10px;
}

.col-padding {
  padding-top: 0;
  padding-bottom: 0;
}
</style>

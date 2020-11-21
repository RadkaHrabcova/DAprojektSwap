<template>
  <div class="profile_update">
    <h1></h1>
    <form class="form" @submit.prevent="updateProfile">
      <v-text-field
            v-model="userProfile.userName"
            label="Uživatelské jméno"
            outlined
            clearable
            prepend-icon="mdi-account"
          ></v-text-field>

          <v-text-field
            v-model="userProfile.userEmail"
            label="Email"
            outlined
            clearable
            prepend-icon="mdi-email"
          ></v-text-field>

            <v-file-input
              v-model="userProfile.userPhoto"
              counter
              label="Foto"
              multiple
              prepend-icon="mdi-paperclip"
              placeholder="Vyberte ze složky"
              outlined
              :show-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="light-green darken-1"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ userPhoto.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>

          <v-text-field
            v-model="userProfile.userLocation"
            label="Lokalita"
            outlined
            prepend-icon="mdi-map-marker"
            clearable
          ></v-text-field>

          <v-textarea
            v-model="userProfile.searches"
            label="Hledám"
            counter
            maxlength="120"
            full-width
            outlined
          ></v-textarea>

          <v-textarea
            v-model="userProfile.offers"
            label="Nabízím"
            counter
            maxlength="120"
            full-width
            outlined
          ></v-textarea>

          <v-btn
            class="ma-2"
            outlined
            color="gray"
            >Uložit
            </v-btn>
    </form>
  </div>
</template>

<script>
// import firebase from "firebase/app";

export default {
  name: "ProfileUpdate",

  data() {
    return {
      userProfile: {},
      userName: "",
      userEmail: "",
      userPhoto: [],
      userLocation: "",
      searches: "",
      offers: ""
    };
  }

  /*    methods:{
      fetchProfile() {
        fetch("http://127.0.0.1:5000/user/2wh6IXQRLfOBOLkXW2dXOydS06c2")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
             throw Error("Něco je špatně");
            }
          })
          .then((json) => {
            this.userProfile = json;
          })
          .catch((error) => {
            this.userProfile = error;
        });
      },

      updateProfile(){
       fetch("http://127.0.0.1:5000/user/2wh6IXQRLfOBOLkXW2dXOydS06c2",{
         method:"PUT",
         headers:{
           "Content-Type":"application/json"
         },
         body:JSON.stringify({
           location:this.location,
           searches:this.searches,
           offers:this.offers,
         })
       })
      
      var user =  firebase.auth().currentUser;
      user.updateProfile({
         displayName: this.userName,
         photoURL: this.userPhoto
       }).then(function() {
       }).catch(function(error) {
         throw error;
       });

       user.updateEmail(this.userEmail).then(function() {
       }).catch(function(error) {
         throw error;
       });
     } 
   },

  created(){
    this.fetchProfile();
  } */
};
</script>

<style>
.form{
  margin: 10px;
}
</style>

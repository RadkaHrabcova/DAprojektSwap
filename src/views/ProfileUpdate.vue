<template>
  <div class="profile_update">
    <h2>Aktualizace profilu</h2>
    <form class="form" @submit.prevent="updateProfile">
      <v-text-field
            v-model="userName"
            :error-messages="nameErrors"
            label="Uživatelské jméno"
            outlined
            clearable
            prepend-icon="mdi-account"
            @input="$v.userName.$touch()"
            @blur="$v.userName.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="userEmail"
            :error-messages="emailErrors"
            label="Email"
            outlined
            clearable
            prepend-icon="mdi-email"
            @input="$v.userEmail.$touch()"
            @blur="$v.userEmail.$touch()"
          ></v-text-field>

            <v-file-input
              v-model="userPhoto"
              counter
              label="Foto"
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
              </template>
            </v-file-input>

          <v-text-field
            v-model="userLocation"
            label="Lokalita"
            outlined
            prepend-icon="mdi-map-marker"
            clearable
          ></v-text-field>

          <v-textarea
            v-model="searches"
            label="Hledám"
            counter
            maxlength="120"
            full-width
            outlined
          ></v-textarea>

          <v-textarea
            v-model="offers"
            label="Nabízím"
            counter
            maxlength="120"
            full-width
            outlined
          ></v-textarea>

          <v-btn
            type="submit"
            outlined
            color="#7CB342"
            >Uložit
            </v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import firebase from "firebase";

export default {
  name: "ProfileUpdate",

  mixins: [validationMixin],

  validations: {
      userName: { required, maxLength: maxLength(20) },
      userEmail: { required, email },
  },

  data() {
    return {
      userName: null,
      userEmail: null,
      userPhoto: null,
      userLocation: null,
      searches: null,
      offers: null
    };
  },

  computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.userName.$dirty) return errors
        !this.$v.userName.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.userName.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.userEmail.$dirty) return errors
        !this.$v.userEmail.email && errors.push('Must be valid e-mail')
        !this.$v.userEmail.required && errors.push('E-mail is required')
        return errors
      },
  },

    methods: {
      fetchProfile() {
        var user = firebase.auth().currentUser;

        if (user != null) {
          this.userName = user.displayName;
          this.userEmail = user.email;
          this.userPhoto = user.photoURL; 

          var path = "https://beta-swapito-main-sv1kp3pz6lex.herokuapp.com/user/" + user.uid;
          fetch(path)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw Error("Něco je špatně");
              }
            })
            .then((object) => {
              this.userLocation = object.location;
              this.searches = object.searches;
              this.offers = object.offers;
            })
            .catch((error) => {
              this.user = error;
            });
        }
      },

    updateProfile(){
      var user = firebase.auth().currentUser;
      this.$v.$touch();
       fetch("https://beta-swapito-main-sv1kp3pz6lex.herokuapp.com/user/" + user.uid,{
         method:"PUT",
         headers:{
           "Content-Type":"application/json"
         },
         body:JSON.stringify({
           location:this.userLocation,
           searches:this.searches,
           offers:this.offers,
           userName: this.userName,
           userPhoto: this.userPhoto,
           userEmail: this.userEmail
         })
       })
       this.$router.push('/profile');
     } 
   },

  created(){
    this.fetchProfile();
 },

};
</script>

<style>
.form{
  margin: 10px;
}

h2{
  text-align: center;
  margin-bottom: 20px;
  color: #7CB342;
}
</style>

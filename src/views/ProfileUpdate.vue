<template>
  <div class="profile_update">
    <form @submit.prevent="updateProfile">
                <h2>Uživatelské jméno: </h2>
                <input type="text" v-model="userProfile.userName">
                <h2>Email: </h2>
                <input type="text" v-model="userProfile.userEmail">
                <h2>Photo: </h2>
                <input type="text" v-model="userProfile.userPhoto">                

                <h2>Lokalita: </h2>
                <input type="text" v-model="userProfile.userLocation">
                <h2> Hledám: </h2>
                <textarea v-model="userProfile.searches"></textarea>
                <h2> Nabízím: </h2>
                <input type="text" v-model="userProfile.offers">
                <br/>
                <br/>
                <button>Update</button>
    </form>
  </div>
</template>

<script>
// import firebase from "firebase/app";

export default {
  name: "ProfileUpdate",

  data(){
       return{
        userProfile: {},
        userName: "",
        userEmail: "",
        userPhoto: "",
        userLocation:"",
        searches:"",
        offers: "",
       };
   },

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

}
</script>

<style>

</style>
<template>
    <div class="profile" v-if="user">
        <h4>{{userName}}</h4>
        <div class="card horizontal" >
            <div class="card-image"> 
                <img :src="userPhoto"/> 
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>
                        Email: {{userEmail}}
                    </p>
                </div>
            </div>
        </div>
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
           }
       });
   }

};
</script>

<style lang="css" scoped>
.profile{
    margin-bottom: 10px;
    border-bottom: 1px solid black;
}

.card{
    max-width: 400px;
    margin: 0 auto;
}

.card-image{
    margin-top: 25px;
    margin-left: 10px;
}

.card-image img{
    width: 85px;
    height: auto;
    border-radius: 50%;
    border: 1px dotted black;
}
</style>

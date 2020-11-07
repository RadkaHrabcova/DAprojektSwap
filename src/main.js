import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from './router'
import  firebase from "firebase/app";
import "firebase/auth";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyCnO4WL7nIv8L3ZkXgHk7mOh15LBH0sMOA",
  authDomain: "swapito-ea322.firebaseapp.com",
  databaseURL: "https://swapito-ea322.firebaseio.com",
  projectId: "swapito-ea322",
  storageBucket: "swapito-ea322.appspot.com",
  messagingSenderId: "535557202142",
  appId: "1:535557202142:web:2a3fe81ad7b320aaec624f"
};

firebase.initializeApp(firebaseConfig);


new Vue({
   router,
  render: h => h(App)
}).$mount("#app");

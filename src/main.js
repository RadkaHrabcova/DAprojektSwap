import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import firebase from "firebase/app";
import "firebase/auth";
import vuetify from "./plugins/vuetify";
var VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo)

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCgRTV6jfjTad5e9FDjtIDWuWUcX6aEglk",
  authDomain: "swapito-9e681.firebaseapp.com",
  databaseURL: "https://swapito-9e681.firebaseio.com",
  projectId: "swapito-9e681",
  storageBucket: "swapito-9e681.appspot.com",
  messagingSenderId: "713549805089",
  appId: "1:713549805089:web:9ed0ceafe267549463d560"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");

<template>
  <v-app>
    <Navbar/>
    <v-main>  
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./views/Navbar.vue"

export default {
  name: "App",

  components: {
    Navbar: Navbar
  },
};
</script>

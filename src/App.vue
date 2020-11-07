<template>
  <div id="app">
    <navbar/>
   <router-link to="/">Domů</router-link>
   <hr>
    <router-view/>
   
    
  </div>
</template>

<script>
import Navbar from './views/Navbar.vue'

export default {
    components: {
    navbar: Navbar,
  }
}

</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
 
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

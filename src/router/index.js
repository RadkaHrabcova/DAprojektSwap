import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Form from '../views/Form.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
        path: '/form',
        name: 'Form',
        component: Form
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router
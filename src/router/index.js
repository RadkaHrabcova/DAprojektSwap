import Vue from "vue";
import VueRouter from "vue-router";
import Form from "../views/Form.vue";
import Profile from "../views/Profile.vue";
import ProfileUpdate from "../views/ProfileUpdate.vue";
import Login from "../views/Login.vue";
import AllAds from "../views/AllAds.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/form",
    name: "Form",
    component: Form
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/profileUpdate",
    name: "ProfileUpdate",
    component: ProfileUpdate
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "AllAds",
    component: AllAds
  },
  {
    path: "/privacy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

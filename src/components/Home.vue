<template>
  <div class="app">
    <h2>ログインフォーム</h2>
    <Login v-if="!isLogin || loginUser.displayName == 'ゲスト'"></Login>

    <h2>ログアウトフォーム</h2>
    <Logout v-if="isLogin" :loginUser="loginUser"></Logout>

    <div v-if="isLogin">
      <div>{{ loginUser.displayName }} さん</div>
      <div>
        <img :src="loginUser.photoURL" />
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>

import firebase from "./firebase/db";
import Login from "@/components/Login.vue";
import Logout from "@/components/Logout.vue";

export default {
  name: "Index",
  components: {
    Login: Login,
    Logout: Logout,
  },

  data() {
    return {
      isLogin: false,
      loginUser: null,
    };
  },

  beforeRouteEnter(route, redirect, next) {
    console.log("Home_beforeRouteEnter");

    firebase.auth().onAuthStateChanged((user) => {
      console.log("onAuthStateChanged 1", user);
      console.log(firebase.auth().currentUser);
      next((vm) => {
        console.log("Auth start");
        var user = firebase.auth().currentUser;

        if (!user) {
          return;
        }

        vm.isLogin = true;
        vm.loginUser = user;
      });
    });
  },

  beforeRouteUpdate(to, from, next) {
    var vm = this;
    console.log("Home_beforeRouteUpdate" + " from:" + from + " to:" + to);
    vm.isLogin = false;
    vm.loginUser = null;
    firebase.auth().onAuthStateChanged((user) => {
      console.log("onAuthStateChanged 2", user);
      if (!user) {
        next();
        return;
      }
      vm.isLogin = true;
      vm.loginUser = user;
      next();
    });
  },
};
</script>

<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<script>
import firebase from "firebase/app";
import firebaseui from "firebaseui-ja";
import "firebaseui-ja/dist/firebaseui.css";

export default {
  name: "auth",
  mounted() {
    var uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "/success",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    //   callbacks: {
    //     signInSuccessWithAuthResult: function (authResult, redirectUrl) {
    //       console.log("authResult:", authResult, " redirectUrl:", redirectUrl);
    //       return true;
    //     },
    //   },
    };
    console.log("auth start");
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
    console.log("ui start");
  },
};
</script>
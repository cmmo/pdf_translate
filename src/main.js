
import Vue from "vue";
import App from "@/App.vue";
import vuetify from './plugins/vuetify';
import router from "@/router/index";
import firebase from 'firebase'
import { config } from './helpers/firebaseConfig'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    vuetify,
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    created() {
        firebase.initializeApp(config);
        console.log("firebase initialized")
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("success")
                // this.$router.push('/success')
            } else {
                console.log("auth")
                // this.$router.push('/auth')
            }
        });
    },
})

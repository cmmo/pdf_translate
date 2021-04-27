import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {firestorePlugin} from 'vuefire'

// import GAuth from 'vue-google-oauth2'
// const gauthOption = {
//   clientId: '667393057319-lurpsvl0ht2kps6cejnkjqttfd9vkk59.apps.googleusercontent.com',
// }
// Vue.use(GAuth, gauthOption)

Vue.use(firestorePlugin);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

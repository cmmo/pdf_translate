import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
import AuthSuccess from '@/components/AuthSuccess'
// import Login from '@/components/Login'
import Auth from '@/components/Auth'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Auth
    },
    {
      path: '/auth',
      component: Auth
    },
    {
      path: '/success',
      component: AuthSuccess
    }
  ]
})

export default router; 

import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import GoogleMap from '@/components/GoogleMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: GoogleMap
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

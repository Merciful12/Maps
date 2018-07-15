import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import ProfileEdit from '@/components/ProfileEdit'
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
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      children: [{
        path: 'edit',
        name: 'edit',
        component: ProfileEdit
      }]
    }
  ]
})

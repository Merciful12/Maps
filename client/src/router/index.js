import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/profile/Profile'
import Edit from '@/components/profile/Edit'
import EditMarker from '@/components/profile/EditMarker'
import Show from '@/components/profile/Show'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
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
      component: Profile,
      children: [
        {
          path: '',
          name: 'profile-show',
          component: Show
        },
        {
          path: 'edit',
          name: 'profile-edit',
          component: Edit
        },
        {
          path: 'marker/edit',
          name: 'marker-edit',
          component: EditMarker
        }
      ]
    }
  ]
})

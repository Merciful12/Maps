import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/profile/Profile'
import Edit from '@/components/profile/Edit'
import EditMarker from '@/components/profile/EditMarker'
import Show from '@/components/profile/Show'
import Index from '@/components/Index'
// const AdminRoutes = require('./admin')
import HomeAdmin from '@/components/admin/HomeAdmin'
import ShowMarkerAdmin from '@/components/admin/ShowMarker'
import ShowUserAdmin from '@/components/admin/ShowUser'
import EditMarkerAdmin from '@/components/admin/EditMarker'
import EditUserAdmin from '@/components/admin/EditUser'
import LoginAdmin from '@/components/admin/LoginAdmin'

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
    },
    {
      path: '/admin/login',
      name: 'login-admin',
      component: LoginAdmin
    },
    {
      path: '/admin/',
      name: 'home-admin',
      component: HomeAdmin
    },
    {
      path: '/admin/user/:id',
      name: 'show-user',
      component: ShowUserAdmin
    },
    {
      path: '/admin/user/:id/edit',
      name: 'edit-user',
      component: EditUserAdmin
    },
    {
      path: '/admin/marker:id',
      name: 'show-marker',
      component: ShowMarkerAdmin
    },
    {
      path: '/admin/marker:id/edit',
      name: 'edit-marker',
      component: EditMarkerAdmin
    }
  ]
})

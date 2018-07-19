import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import ProfileBase from '@/components/profile/ProfileBase'
import EditProfile from '@/components/profile/EditProfile'
import EditMarker from '@/components/profile/EditMarker'
import CreateMarker from '@/components/profile/CreateMarker'
import ShowProfile from '@/components/profile/ShowProfile'
import Index from '@/components/Index'
import HomeAdmin from '@/components/admin/HomeAdmin'
import ShowMarkerAdmin from '@/components/admin/ShowMarker'
import ShowUserAdmin from '@/components/admin/ShowUser'
import EditMarkerAdmin from '@/components/admin/EditMarker'
import EditUserAdmin from '@/components/admin/EditUser'

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
      component: ProfileBase,
      children: [
        {
          path: '',
          name: 'profile-show',
          component: ShowProfile
        },
        {
          path: 'edit',
          name: 'profile-edit',
          component: EditProfile
        },
        {
          path: 'marker/edit',
          name: 'marker-edit',
          component: EditMarker
        },
        {
          path: 'marker/create',
          name: 'marker-create',
          component: CreateMarker
        }
      ]
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

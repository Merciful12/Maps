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
import ShowZone from '@/components/admin/ShowZone'
import EditZone from '@/components/admin/EditZone'
import CreateZone from '@/components/admin/CreateZone'
import RegisterAdmin from '@/components/admin/RegisterAdmin'
import store from '@/store/store'

Vue.use(Router)
const router = new Router({
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
          meta: {
            requiresAuth: true
          },
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
      path: '/admin/register',
      name: 'register-admin',
      component: RegisterAdmin
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
      path: '/admin/marker/:id',
      name: 'show-marker',
      component: ShowMarkerAdmin
    },
    {
      path: '/admin/marker/:id/edit',
      name: 'edit-marker',
      component: EditMarkerAdmin
    },
    {
      path: '/admin/zone/:id',
      name: 'show-zone',
      component: ShowZone
    },
    {
      path: '/admin/zone/:id/edit',
      name: 'edit-zone',
      component: EditZone
    },
    {
      path: '/admin/zones/create',
      name: 'create-zone',
      component: CreateZone
    },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    store.state.user ? next() : next('/login')
  }
  next()
})

export default router

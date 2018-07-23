<template>
  <b-navbar toggleable="md" type="dark" variant="info" fixed="top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand><router-link :to="{ name: 'index' }">Maps</router-link></b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item v-if="isLoggedIn" :to="{ name: 'profile-show' }">Profile</b-nav-item>
        <b-nav-item v-if="userRole === 'admin'" :to="{ name: 'home-admin' }">Admin</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!isLoggedIn"  :to="{ name: 'login' }">Login</b-nav-item>
        <b-nav-item v-else  @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Navbar',
  methods: {
    logout () {
      AuthService.logout()
        .then(() => {
          this.$store.dispatch('setUser', null)
          this.$router.push({ name: 'login' })
        })
        .catch((err) => {
          console.log(err.response.data.message)
          this.$router.push({ name: 'index' })
        })
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.user !== null
    },
    userRole () {
      return this.$store.state.user && this.$store.state.user.role
    }
  }
}
</script>

<style scoped>
a {
  color: aliceblue;
}
a:hover {
  cursor: pointer;
  text-decoration: none;
}
</style>

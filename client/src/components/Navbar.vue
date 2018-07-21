<template>
  <b-navbar toggleable="md" type="dark" variant="info" fixed="top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand><router-link :to="{ name: 'index' }">Maps</router-link></b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'profile-show' }">Profile</b-nav-item>
        <b-nav-item :to="{ name: 'home-admin' }">Admin</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
        <b-nav-item @click="logout">Logout</b-nav-item>
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
          this.$router.push({ name: 'index' })
        })
        .catch((err) => {
          console.log(err.response.data.message)
          this.$router.push({ name: 'index' })
        })
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

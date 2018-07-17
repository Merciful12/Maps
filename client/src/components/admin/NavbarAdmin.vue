<template>
  <b-navbar toggleable="md" type="dark" variant="success" fixed="top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="/">Maps</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            User
          </template>
          <b-dropdown-item :to="{ name: 'home-admin' }">Profile</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'login-admin' }">Login</b-dropdown-item>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  data () {
    return {
      user: null
    }
  },
  methods: {
    logout () {
      AuthService.logout()
        .then(() => {
          this.$router.push({ name: 'logout-admin' })
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    }
  }
}
</script>

<style scoped>

</style>

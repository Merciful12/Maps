<!--suppress ALL -->
<template>
  <b-container>
    <h1 class="text-center">HELLO TO THE BEST APP EVER</h1>
    <b-row align-h="between">
      <b-button v-if="!isLoggedIn" :to="{ name: 'login' }">LOGIN</b-button>
      <b-button v-if="!isLoggedIn"  :to="{ name: 'register' }">Register</b-button>
      <b-button v-if="isLoggedIn" :to="{ name: 'profile-show' }">PROFILE</b-button>
      <b-button v-if="userRole === 'admin'" :to="{ name: 'home-admin' }">ADMIN PAGE</b-button>
    </b-row>
  </b-container>
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$store.state.user
    },
    userRole () {
      return this.$store.state.user && this.$store.state.user.role
    }
  }
}
</script>

<style scoped>

</style>

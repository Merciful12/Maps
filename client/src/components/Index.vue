<!--suppress ALL -->
<template>
  <b-container>
    <h1 class="text-center">HELLO TO THE BEST APP EVER</h1>
    <b-row align-h="between">
      <b-button :to="{ name: 'profile-show' }">PROFILE</b-button>
      <b-button :to="{ name: 'home-admin' }">ADMIN PAGE</b-button>
      <b-button :to="{ name: 'login' }">LOGIN</b-button>
    </b-row>
  </b-container>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>

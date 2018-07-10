<template>
  <div id="app">
    <navbar></navbar>
    <google-map class="content" />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import GoogleMap from './components/GoogleMap'

export default {
  name: 'App',
  components: {
    GoogleMap,
    Navbar
  }
}
</script>

<style>
.content {
  margin-top: 100px;
}
</style>

<template>
  <div id="app">
    <navbar />
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
.map {
  height: 350px;
}

.content {
  margin-top: 100px;
}
</style>

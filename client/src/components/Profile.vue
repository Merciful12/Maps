<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="8">
        <b-jumbotron>
          <template v-if="user">
            <h1 class="text-center">{{ user.name }}</h1>
            <h3><b>Email:</b> {{ user.email }}</h3>
            <h3><b>Age:</b> {{ user.age }}</h3>
            <br><br>
            <b-button :to="{name: 'edit'}" variant="warning">Edit</b-button>
            <router-view></router-view>
          </template>
          <template v-else>
            <b-alert variant="danger" :show="user === null">{{ error }}</b-alert>
          </template>
        </b-jumbotron>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import UserService from '@/services/UserService'
export default {
  mounted () {
    UserService.me()
      .then((response) => {
        this.user = response.data
      })
      .catch((err) => {
        this.error = err.response.data.message
      })
  },
  data () {
    return {
      user: null,
      error: ''
    }
  }
}
</script>
<style scoped>

</style>

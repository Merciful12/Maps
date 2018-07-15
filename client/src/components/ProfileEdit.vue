<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="8">
        <b-jumbotron>
          <template v-if="user">
            <b>Name</b> <b-input v-model="user.name" />
            <b>Email</b><b-input v-model="user.email" />
            <b>Age</b><b-input v-model="user.age" />
            <br><br>
            <b-button @click="save" variant="success">Save</b-button>
            {{ user }}
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
  },
  methods: {
    save () {
      // validate
      UserService.edit(this.user.id, {
        name: this.user.name,
        email: this.user.email,
        age: Number(this.user.age)
      })
        .then(() => {
          this.$router.push({ name: 'profile' })
        })
        .catch((err) => {
          this.error = err
        })
    }
  }
}
</script>
<style scoped>

</style>

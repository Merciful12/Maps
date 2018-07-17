<template>
  <div>
    <template v-if="user">
      <b>Name</b> <b-input v-model="user.name" />
      <b>Email</b><b-input v-model="user.email" />
      <b>Age</b><b-input v-model.number="user.age" />
      <b-button class="mt-4" @click="save" variant="success">Save</b-button>
    </template>
    <b-alert variant="danger" :show="error !== ''">{{ error }}</b-alert>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  created () {
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
      UserService.edit({
        name: this.user.name,
        email: this.user.email,
        age: this.user.age
      })
        .then(() => {
          this.$router.push({
            name: 'show-user',
            params: {
              userId: this.user.id
            }
          })
        })
        .catch(err => {
          this.error = err.response.data.message
        })
    }
  }
}
</script>
<style scoped>

</style>

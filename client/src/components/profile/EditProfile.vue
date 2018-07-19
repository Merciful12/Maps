<template>
  <div>
    <template v-if="user">
      <b>Name</b> <b-input v-model.lazy="user.name" />
      <b>Email</b><b-input v-model.lazy="user.email" />
      <b>Age</b><b-input v-model.lazy.number="user.age" />
      <b-button class="my-4" @click="save" variant="success">Save</b-button>
    </template>
    <b-alert v-for="(error, i) in errors"
            :key="i"
            variant="danger"
            :show="errors.length > 0"
            >
            {{ error }}
    </b-alert>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import { validateName, validateEmail, validateAge } from '@/validators/validators'
export default {
  created () {
    UserService.me()
      .then((response) => {
        this.user = response.data
      })
      .catch((err) => {
        this.errors.push(err.response.data.message)
      })
  },
  data () {
    return {
      user: null,
      errors: []
    }
  },
  methods: {
    save () {
      this.errors = []
      if (!validateName(this.user.name)) {
        this.errors.push('The name must provide of letters and have a length > 0')
      }

      if (!validateEmail(this.user.email)) {
        this.errors.push('The email must be like "example@example.example"')
      }

      if (!validateAge(this.user.age)) {
        this.errors.push('The age must be a positive number')
      }

      if (this.errors.length) return

      UserService.edit({
        name: this.user.name,
        email: this.user.email,
        age: this.user.age
      })
        .then(() => {
          this.$router.push({ name: 'profile-show' })
        })
        .catch(err => {
          this.errors.push(err.response.data.message)
        })
    }
  }
}
</script>

<style scoped>

</style>

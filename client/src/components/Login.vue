<template>
  <b-container>
    <b-row align-h="center">
      <b-col md="5">
        <b-form @submit.prevent="login">
          <b-form-group>
            <b-form-input type="email"
                          v-model="email"
                          required
                          placeholder="Enter email">
            </b-form-input>
          </b-form-group>
          <b-form-group>

            <b-form-input type="password"
                          v-model="password"
                          required
                          placeholder="Enter password">
            </b-form-input>
            </b-form-group>
            <b-alert v-for="(error, i) in errors"
              :key="i"
              variant="danger"
              :show="errors.length > 0"
              >
              {{ error }}
            </b-alert>
          <b-button type="submit" class="my-4" variant="primary">Login</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AuthService from '@/services/AuthService'
import { validateEmail } from '@/validators/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    login () {
      this.errors = []
      !validateEmail(this.email) &&
        this.errors.push('The email must be like "example@example.example"')

      if (this.errors.length) return
      AuthService.login({
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.$store.dispatch('setUser', response.data)
          const nextRoute = (response.data.role === 'user') ? 'profile-show' : 'home-admin'
          this.$router.push({ name: nextRoute })
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

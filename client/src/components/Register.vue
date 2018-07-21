<template>
  <b-container>
    <b-row align-h="center">
      <b-col md="5">
        <b-form @submit.prevent="submit">
            <b-form-input type="email"
                          v-model="email"
                          required
                          placeholder="Enter email">
            </b-form-input>

            <b-form-input type="password"
                          v-model="password"
                          required
                          placeholder="Enter password">
            </b-form-input>
          <b-button type="submit" variant="primary">Register</b-button>
        </b-form>
        <b-alert v-for="(error, i) in errors"
            :key="i"
            variant="danger"
            :show="errors.length > 0"
            >
            {{ error }}
    </b-alert>
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
    submit () {
      this.errors = []
      if (!validateEmail(this.email) &&
      this.errors.push('The email must be like "example@example.example"')) {
        return
      }

      AuthService.register({
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push({name: 'index'})
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

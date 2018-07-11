<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="5">
        <b-form @submit.prevent="onSubmit">
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
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  data () {
    return {
      email: '',
      password: '',
      show: true
    }
  },
  methods: {
    async onSubmit (evt) {
      const response = await AuthService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<style scoped>
</style>

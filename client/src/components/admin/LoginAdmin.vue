<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="5">
        <router-view></router-view>
        <b-form @submit.prevent="onSubmit">
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
            <b-alert variant="danger" :show="error !== ''">{{ error }}</b-alert>
          <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AdminService from '@/services/AdminService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    onSubmit (evt) {
      AdminService.loginAdmin({
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.$router.push({ name: 'home-admin' })
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

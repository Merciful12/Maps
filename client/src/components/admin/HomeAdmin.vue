<template>
  <b-container>
    <b-row align-h="center">
      <b-col md="9">
        <template v-if="users && markers">
          <h1>Users:</h1>
          <ul>
            <li v-for="user in users" :key="user.id">
              <router-link :to="{ name: 'show-user', params: { id: user.id }}">
                {{ user.name || user.email }}
              </router-link>
            </li>
          </ul>
          <h1>Markers:</h1>
          <ul>
            <li v-for="marker in markers" :key="marker.userId">
              <router-link :to="{ name: 'show-marker', params: { id: marker.userId }}">
                user id {{ marker.userId }}, who has the marker; lat: {{ marker.lng }}; lng: {{ marker.lat }}
              </router-link>
            </li>
          </ul>
        </template>
        <b-alert variant="danger" :show="error !== ''">{{ error }}</b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AdminService from '@/services/AdminService'
export default {
  data () {
    return {
      users: null,
      markers: null,
      error: ''
    }
  },
  created () {
    AdminService.index()
      .then(response => {
        console.log(response.data)
        this.users = response.data.users
        this.markers = response.data.markers
      })
      .catch(err => {
        this.error = err.response.data.message
      })
  }
}
</script>

<style scoped>
</style>

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
          <b-button class="mb-4" :to="{ name: 'register-admin' }">Add</b-button>
          <h1>Markers:</h1>
          <ul>
            <li v-for="marker in markers" :key="marker.userId">
              <router-link :to="{ name: 'show-marker', params: { id: marker.userId }}">
                user id {{ marker.userId }}, who has the marker; lat: {{ marker.lng }}; lng: {{ marker.lat }}
              </router-link>
            </li>
          </ul>
          <h1>Available Zones:</h1>
          <ul>
            <li v-for="zone in zones" :key="zone.id">
              <router-link :to="{ name: 'show-zone', params: { id: zone.id }}">
                lat: {{ zone.lng }}; lng: {{ zone.lat }}; radius: {{ zone.radius }}
              </router-link>
            </li>
          </ul>
          <b-button :to="{ name: 'create-zone' }">Add</b-button>
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
        this.users = response.data.users
        this.markers = response.data.markers
        this.zones = response.data.zones
      })
      .catch(err => {
        this.error = err.response.data.message
      })
  }
}
</script>

<style scoped>
</style>

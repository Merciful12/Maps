<template>
  <div>
    <template v-if="user">
      <h1 class="text-center">{{ user.name }}</h1>
      <h4><b>Email:</b> {{ user.email }}</h4>
      <h4><b>Age:</b> {{ user.age }}</h4>
      <b-button class="my-4" :to="{name: 'profile-edit'}" variant="warning">Edit profile</b-button>
      <hr>
      <template v-if="user.Marker && user.Marker.zoneId">
        <ul><h4><b>Location:</b></h4>
        <li><b>lat:</b> {{ user.Marker.lat }}</li>
        <li><b>lng:</b> {{ user.Marker.lng }}</li>
        </ul>
        <gmap-map
          :center="user.Marker"
          :zoom="11"
          class="w-100 map"
        >
          <gmap-marker
            :position="user.Marker"
          ></gmap-marker>
        </gmap-map>
        <b-button class="my-4" :to="{name: 'marker-edit'}" variant="warning">Edit marker</b-button>
      </template>
      <template v-else-if="user.Marker && !user.Marker.zoneId">
        <h5>Your marker's zone has changed. You need to set new marker</h5>
        <b-btn class="mt-3" variant="success" :to="{name: 'marker-edit'}">set new marker</b-btn>
      </template>
      <b-button v-else class="my-4" :to="{name: 'marker-create'}" variant="warning">Add marker</b-button>
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
export default {
  created () {
    UserService.me()
      .then(response => {
        this.user = response.data
      })
      .catch(err => {
        this.errors.push(err.response.data.message)
      })
  },
  data () {
    return {
      user: null,
      errors: []
    }
  }
}
</script>
<style scoped>
hr {
  border-top: 5px solid rgba(0, 0, 0, 0.1);
}
</style>

<template>
  <b-container>
    <b-row align-h="center">
      <b-col md="8">
        <template v-if="user">
          <h4><b>Name:</b> {{ user.name || 'has not yet' }}</h4>
          <h4><b>Email:</b> {{ user.email || 'has not yet' }}</h4>
          <h4><b>Age:</b> {{ user.age || 'has not yet' }}</h4>
          <b-button class="my-4" :to="{name: 'edit-user', params: {id: user.id}}" variant="warning">Edit user</b-button>
          <hr>
          <template v-if="user.Marker">
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
          </template>
          <h4 v-else>user doesnt have a marker yet</h4>
        </template>
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
import AdminService from '@/services/AdminService'
export default {
  created () {
    const userId = this.$route.params.id
    AdminService.showUser(userId)
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

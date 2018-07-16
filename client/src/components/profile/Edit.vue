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
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    },
    setMarker (point) {
      this.currentPlace = {
        lat: point.latLng.lat(),
        lng: point.latLng.lng()
      }
    },
    addMarker () {
      const marker = this.currentPlace
      if (marker) {
        this.users.push({
          Marker: marker,
          name: 'User' + (Math.random() * 100).toFixed()
        })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geoLocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
      this.currentPlace = this.center
    },
    save () {
      // validate
      UserService.edit({
        name: this.user.name,
        email: this.user.email,
        age: this.user.age
      })
        .then(() => {
          this.$router.push({ name: 'profile-show' })
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

<template>
  <div>
    <template v-if="marker">
      <label>
      <gmap-autocomplete
        @place_changed="setPlace"
        class="w-100"
      >
      </gmap-autocomplete>
      </label>
      <b-button @click="geoLocate"
                size="sm"
                >auto
      </b-button>
      <b-row align-h="around">
        <gmap-map
          class="mt-4"
          @click.prevent:="setMarker"
          :center="this.marker"
          :zoom="11"
          style="width: 350px;  height: 350px"
        >
          <gmap-marker
            :position="this.marker"
          ></gmap-marker>
        </gmap-map>
        <ul><h4><b>Location:</b></h4>
          <li><b>lat:</b> {{ marker.lat }}</li>
          <li><b>lng:</b> {{ marker.lng }}</li>
        </ul>
      </b-row>

      <b-button class="my-4"
                @click="save"
                variant="success"
                >Save
      </b-button>
    </template>
    <b-alert variant="danger" :show="error !== ''">{{ error }}</b-alert>
  </div>
</template>

<script>
import MarkerService from '@/services/MarkerService'
export default {
  created () {
    MarkerService.my()
      .then(response => {
        this.marker = response.data
      })
      .catch(err => {
        this.error = err.response.data.message
      })
  },
  data () {
    return {
      marker: null,
      error: ''
    }
  },
  methods: {
    save () {
      MarkerService.edit(this.marker)
        .then(() => {
          this.$router.push({ name: 'profile-show' })
        })
        .catch(err => {
          this.error = err.response.data.message
        })
    },
    setPlace (place) {
      this.marker.lat = place.geometry.location.lat()
      this.marker.lng = place.geometry.location.lng()
    },
    setMarker (point) {
      this.marker.lat = point.latLng.lat()
      this.marker.lng = point.latLng.lng()
    },
    geoLocate () {
      navigator.geolocation.getCurrentPosition(position => {
        this.marker.lat = position.coords.latitude
        this.marker.lng = position.coords.longitude
      })
    }
  }
}
</script>

<style scoped>

</style>

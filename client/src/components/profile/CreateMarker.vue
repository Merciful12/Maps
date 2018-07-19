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
      <ul class="mt-4"><h4><b>Location:</b></h4>
          <li><b>lat:</b> {{ marker.lat }}</li>
          <li><b>lng:</b> {{ marker.lng }}</li>
        </ul>
        <gmap-map
          class="mt-4 w-100"
          @click.prevent:="error = 'This is unavailable zone'"
          :center="this.marker"
          :zoom="11"
          style="height: 350px"
        >
          <gmap-circle
            v-for="(zone, index) in zones" :key="index"
            @click="setMarker"
            :center="{
              lng: zone.lng,
              lat: zone.lat
            }"
            :radius="zone.radius"
          >
          </gmap-circle>
          <gmap-marker
            :position="this.marker"
          ></gmap-marker>
        </gmap-map>
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
import ZoneService from '@/services/ZoneService'
import MarkerService from '@/services/MarkerService'
export default {
  created () {
    ZoneService.list()
      .then(response => {
        this.zones = response.data
      })
      .catch(err => {
        this.error = err.response.data.message
      })
  },
  data () {
    return {
      marker: {
        lng: 50,
        lat: 50
      },
      zones: null,
      error: ''
    }
  },
  methods: {
    log (e) {
      console.log(e)
    },
    save () {
      MarkerService.create(this.marker)
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
      this.error = ''
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

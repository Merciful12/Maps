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
          class="mt-4 w-100 map"
          @click.prevent:="setMarker"
          :center="marker"
          :zoom="11"
        >
          <gmap-circle
            :options="{fillColor: 'green', strokeColor: 'green'}"
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
            :position="marker"
          ></gmap-marker>
        </gmap-map>
      <b-button class="my-4"
                @click="save"
                variant="success"
                >Save
      </b-button>
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
import MarkerService from '@/services/MarkerService'
import { markerHandler } from '@/mixins/markerHandler'
export default {
  mixins: [markerHandler],
  created () {
    MarkerService.my()
      .then(response => {
        this.marker = response.data
      })
      .catch(err => {
        this.errors.push(err.response.data.message)
      })
  },
  methods: {
    save () {
      if (!this.marker.zoneId) this.errors.push('Cannot create marker here')

      if (this.errors.length) return

      MarkerService.edit(this.marker)
        .then(() => {
          this.$router.push({ name: 'profile-show' })
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

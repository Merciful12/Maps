<template>
  <div>
    <template v-if="$store.state.user">
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
      <ul v-if="marker" class="mt-4"><h4><b>Location:</b></h4>
          <li><b>lat:</b> {{ marker.lat }}</li>
          <li><b>lng:</b> {{ marker.lng }}</li>
        </ul>
        <gmap-map
          class="mt-4 w-100 map"
          @click.prevent:="setMarker"
          :center="{lat: 0, lng: 0}"
          :zoom="2"
        >
          <gmap-circle
            :options="{fillColor: 'green', strokeColor: 'green'}"
            v-for="(zone, index) in zones" :key="index"
            @click="setMarker"
            :center="zone"
            :radius="zone.radius"
          >
          </gmap-circle>
          <gmap-marker
            v-if="marker"
            :position="marker"
          ></gmap-marker>
        </gmap-map>
        <b-button class="my-4"
                  @click="save"
                  :disabled="!canSave"
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
  methods: {
    save () {
      MarkerService.create(this.marker)
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

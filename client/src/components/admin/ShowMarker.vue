<template>
  <b-container>
    <b-row align-h="center">
      <b-col md="8">
        <template v-if="marker">
          <ul><h4><b>Location:</b></h4>
          <li><b>lat:</b> {{ marker.lat }}</li>
          <li><b>lng:</b> {{ marker.lng }}</li>
          </ul>
          <gmap-map
            :center="marker"
            :zoom="11"
            class="w-100 map"
          >
            <gmap-marker
              :position="marker"
            ></gmap-marker>
          </gmap-map>
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AdminService from '@/services/AdminService'
export default {
  created () {
    const userId = this.$route.params.id
    AdminService.showMarker(userId)
      .then(response => {
        this.marker = response.data
      })
      .catch(err => {
        this.errors.push(err.response.data.message)
      })
  },
  data () {
    return {
      marker: null,
      errors: []
    }
  }
}
</script>

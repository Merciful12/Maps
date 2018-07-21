<template>
  <div>
    <gmap-map
          @click="newCenter"
          class="mt-4 w-100"
          :center="{lng: 0, lat: 0}"
          :zoom="2"
          style="height: 350px"
        >
          <gmap-circle
            v-if="zone"
            :options="{fillColor: 'green', strokeColor: 'green'}"
            editable
            @radius_changed="setRadius"
            @center_changed="setCenter"
            ref="circle"
            :center="zone"
            :radius="zone.radius"
          >
          </gmap-circle>
        </gmap-map>
    <b-button @click="save" variant="success">Save</b-button>
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
import AdminService from '@/services/AdminService'
export default {
  data () {
    return {
      zone: null,
      errors: []
    }
  },
  methods: {
    newCenter (center) {
      this.zone = {
        lat: center.latLng.lat(),
        lng: center.latLng.lng(),
        radius: 1000
      }
    },
    setRadius (radius) {
      this.zone.radius = radius
    },
    setCenter (center) {
      this.zone.lng = center.lng()
      this.zone.lat = center.lat()
    },
    save () {
      AdminService.createZone(this.zone)
        .then(response => {
          const id = response.data.id
          this.$router.push({name: 'show-zone', params: { id: id }})
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

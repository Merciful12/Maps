<template>
  <div>
    <gmap-map
          v-if="zone"
          class="mt-4 w-100 map"
          :center="zone"
          :zoom="11"
        >
          <gmap-circle
            :options="{fillColor: 'green', strokeColor: 'green'}"
            editable
            @radius_changed="setRadiuss"
            @center_changed="setCenterr"
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
  created () {
    const zoneId = this.$route.params.id
    AdminService.showZone(zoneId)
      .then(response => {
        this.zone = response.data
      })
      .catch(err => {
        this.errors.push(err.response.data.message)
      })
  },
  data () {
    return {
      zone: null,
      errors: []
    }
  },
  methods: {
    setRadiuss (radius) {
      this.zone.radius = radius
    },
    setCenterr (center) {
      this.zone.lng = center.lng()
      this.zone.lat = center.lat()
    },
    save () {
      AdminService.editZone({
        lat: this.zone.lat,
        lng: this.zone.lng,
        radius: this.zone.radius
      }, this.zone.id)
        .then(() => {
          this.$router.push({ name: 'show-zone', id: this.zone.id })
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

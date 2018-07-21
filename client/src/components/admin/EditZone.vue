<template>
  <div>
    <gmap-map
          v-if="zone"
          class="mt-4 w-100"
          :center="{
              lng: zone.lng,
              lat: zone.lat
            }"
          :zoom="11"
          style="height: 350px"
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
      errors: [],
      newZoneData: {}
    }
  },
  methods: {
    setRadiuss (radius) {
      this.newZoneData.radius = radius
    },
    setCenterr (center) {
      this.newZoneData.lng = center.lng()
      this.newZoneData.lat = center.lat()
    },
    save () {
      AdminService.editZone(this.newZoneData, this.zone.id)
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

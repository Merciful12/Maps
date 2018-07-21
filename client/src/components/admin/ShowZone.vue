<template>
  <div>
    <template v-if="zone">
    <gmap-map
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
            :center="{
              lng: zone.lng,
              lat: zone.lat
            }"
            :radius="zone.radius"
          >
          </gmap-circle>
        </gmap-map>
        <b-button :to="{ name: 'edit-zone', id: zone.id }" variant="warning">Edit</b-button>
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
  }
}
</script>

<style scoped>

</style>

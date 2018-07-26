<template>
  <div>
    <template v-if="zone">
    <gmap-map
          class="mt-4 w-100 map"
          :center="{
              lng: zone.lng,
              lat: zone.lat
            }"
          :zoom="11"
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
          <gmap-marker
            v-for="(marker, index) in zone.Markers" :key="index"
            :position="marker"
            >
          </gmap-marker>
        </gmap-map>
        <b-button :to="{ name: 'edit-zone', id: zone.id }" variant="warning">Edit</b-button>
        <b-button @click="canDelete" variant="danger">Delete</b-button>
        <b-modal ref="confirmModal" hide-footer title="Deleting zone">
          <div class="d-block text-center">
            <h5>The zone has markers. Are you sure to delete?</h5>
          </div>
          <b-btn class="mt-3" variant="danger" @click="deleteZone">Delete</b-btn>
          <b-btn class="mt-3 ml-auto" variant="primary" @click="hideModal">Cancel</b-btn>
        </b-modal>
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
  },
  methods: {
    canDelete () {
      if (this.zone.Markers.length) {
        this.$refs.confirmModal.show()
      } else {
        this.deleteZone()
      }
    },
    hideModal () {
      this.$refs.confirmModal.hide()
    },
    deleteZone () {
      AdminService.deleteZone(this.zone.id)
        .then(() => {
          this.$router.push({ name: 'home-admin' })
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

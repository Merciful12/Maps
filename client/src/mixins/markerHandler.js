import { validateMarker } from '@/validators/validators'
import ZoneService from '@/services/ZoneService'

export const markerHandler = {
  created () {
    ZoneService.list()
      .then(response => {
        this.zones = response.data
      })
      .catch(err => {
        this.errors.push(err.response.data.message)
      })
  },
  data () {
    return {
      marker: null,
      zones: null,
      errors: []
    }
  },
  methods: {
    setPlace (place) {
      const tempMarker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.errors = []
      const zone = validateMarker(tempMarker, this.zones)
      if (!zone &&
      this.errors.push('Cannot create marker here')) {
        return
      }
      this.marker = {
        ...tempMarker,
        zoneId: zone.id
      }
    },
    setMarker (point) {
      const tempMarker = {
        lat: point.latLng.lat(),
        lng: point.latLng.lng()
      }
      this.errors = []
      const zone = validateMarker(tempMarker, this.zones)
      if (!zone &&
      this.errors.push('Cannot create marker here')) {
        return
      }
      this.marker = {
        ...tempMarker,
        zoneId: zone.id
      }
    },
    geoLocate () {
      this.errors = []
      navigator.geolocation.getCurrentPosition(position => {
        const tempMarker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        const zone = validateMarker(tempMarker, this.zones)
        if (!zone &&
        this.errors.push('Cannot create marker here')) {
          return
        }
        this.marker = {
          ...tempMarker,
          zoneId: zone.id
        }
      })
    }
  }
}

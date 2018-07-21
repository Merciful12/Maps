import { validateMarker } from '@/validators/validators'

export const markerHandler = {
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
      if (!validateMarker(tempMarker, this.zones) &&
      this.errors.push('Cannot create marker here')) {
        return
      }
      this.marker = tempMarker
    },
    setMarker (point) {
      const tempMarker = {
        lat: point.latLng.lat(),
        lng: point.latLng.lng()
      }
      this.errors = []
      if (!validateMarker(tempMarker, this.zones) &&
      this.errors.push('Cannot create marker here')) {
        return
      }
      this.marker = tempMarker
    },
    geoLocate () {
      this.errors = []
      navigator.geolocation.getCurrentPosition(position => {
        const tempMarker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        if (!validateMarker(tempMarker, this.zones) &&
        this.errors.push('Cannot create marker here')) {
          return
        }
        this.marker = tempMarker
      })
    }
  }
}

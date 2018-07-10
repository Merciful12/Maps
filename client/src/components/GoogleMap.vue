<!--suppress ALL -->
<template>
  <b-container>
    <b-row class="mb-5">
      <b-col>
        <h2>Search and add a pin</h2>
          <b-button
            @click="geoLocate"
            variant="danger"
            size="sm"
          >
            My
          </b-button>
        <label>
          <gmap-autocomplete
            @place_changed="setPlace">
          </gmap-autocomplete>
        </label>

          <b-button
            @click="addMarker"
            variant="success"
            :disabled="!isGeoFillIn ? true : false"
          >
            Add
          </b-button>
      </b-col>
    </b-row>
    <b-row align-h="between">
      <b-col>
      <gmap-map
        @click.prevent:="bra"
        :center="center"
        :zoom="11"
        style="width: 500px;  height: 500px"
      >
        <gmap-info-window :position="infoWindowPos" :opened="infoWinOpen"
                          @closeclick="infoWinOpen=false">
          {{infoContent}}
        </gmap-info-window>
        <gmap-marker
          :key="index"
          v-for="(m, index) in users"
          :position="m.position"
          :clickable="true"
          @click="toggleInfoWindow(m,i)"
        ></gmap-marker>
      </gmap-map>
      </b-col>
      <b-col cols="4">
        <h2>Users:</h2>
        <div
          v-for="(user, key) in users"
          :key="key"
          class="mb-2"
        >
          <h4>name: {{user.name}}</h4>
          <p>position lat: {{user.position.lat}}<br>
          position lng: {{user.position.lng}}</p>
        </div>
      </b-col>
    </b-row>

    <br/>
    <br>
  </b-container>
</template>

<script>
export default {
  name: 'GoogleMap',
  data () {
    return {
      center: {lat: 51.6754966, lng: 39.20888230000003},
      users: [
        {
          'position': {
            'lat': 51.71763107561683,
            'lng': 39.16837021503909
          },
          'name': 'Ferdinand'
        }, {
          'position': {
            'lat': 51.72954078110515,
            'lng': 39.208195654492215
          },
          'name': 'Alex'
        }, {
          'position': {
            'lat': 51.70359060911277,
            'lng': 39.19034287128909
          },
          'name': 'John'
        }, {
          'position': {
            'lat': 51.68954578407677,
            'lng': 39.14983078632815
          },
          'name': 'Mike'

        }],
      places: [],
      currentPlace: null,
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null
    }
  },
  computed: {
    isGeoFillIn () {
      return this.currentPlace
    }
  },
  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    },
    bra (point) {
      this.currentPlace = {
        lat: point.latLng.lat(),
        lng: point.latLng.lng()
      }
    },
    addMarker () {
      const marker = this.currentPlace
      if (marker) {
        this.users.push({
          position: marker,
          name: 'User' + (Math.random() * 100).toFixed()
        })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geoLocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
      this.currentPlace = this.center
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = marker.name
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  }
}
</script>

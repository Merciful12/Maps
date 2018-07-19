export const validateName = (name) => {
  const re = /^[A-Za-z]{1,32}$/
  return name && re.test(name)
}

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}

export const validateAge = (age) => {
  const re = /^[1-9]+[0-9]*$/
  return re.test(age)
}

class MarkerInAvailableZone {
  constructor (marker) {
    this.marker = marker
  }

  check (zone) {
    const R = 6378137 // Earth’s mean radius in meter
    const dLat = this.rad(zone.lat - this.marker.lat)
    const dLong = this.rad(zone.lng - this.marker.lng)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(this.marker.lat)) * Math.cos(this.rad(zone.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // the distance in meter
    return (zone.radius - d) >= 0
  }

  rad (x) { return x * Math.PI / 180 }
}

export const validateMarker = (marker, zones) => {
  const checkerMarker = new MarkerInAvailableZone(marker)
  return zones.some(checkerMarker.check.bind(checkerMarker))
}

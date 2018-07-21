import Api from '@/services/Api'

export default {
  index () {
    return Api().get('admin')
  },
  showUser (id) {
    return Api().get(`admin/users/${id}`)
  },
  editUser (user) {
    return Api().put(`admin/users/${user.id}`, user)
  },
  showMarker (userId) {
    return Api().get(`admin/markers/${userId}`)
  },
  editMarker (marker) {
    return Api().put(`admin/markers/${marker.userId}`, marker)
  },
  showZone (id) {
    return Api().get(`admin/zones/${id}`)
  },
  editZone (zone, id) {
    return Api().put(`admin/zones/${id}`, zone)
  },
  createZone (zone) {
    return Api().post(`admin/zones`, zone)
  }
}

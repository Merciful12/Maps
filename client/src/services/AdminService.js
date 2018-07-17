import Api from '@/services/Api'

export default {
  loginAdmin (credentials) {
    return Api().post('admin/login', credentials)
  },
  logoutAdmin () {
    return Api().post('admin/logout')
  },
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
    return Api().get(`admin/markers/${marker.userId}`, marker)
  }
}

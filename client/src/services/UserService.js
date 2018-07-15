import Api from '@/services/Api'

export default {
  me () {
    return Api().get('users/me')
  },
  edit (id, user) {
    return Api().put(`users/${id}`, user)
  }
}

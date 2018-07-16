import Api from '@/services/Api'

export default {
  me () {
    return Api().get('users/me')
  },
  edit (user) {
    return Api().put(`users/edit`, user)
  }
}

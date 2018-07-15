import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('security/login', credentials)
  },
  logout () {
    return Api().post('security/logout')
  }
}

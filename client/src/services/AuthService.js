import Api from '@/services/Api'

export default {
  login (credentials) {
    return Api().post('security/login', credentials)
  },
  logout () {
    return Api().post('security/logout')
  },
  register (credentials) {
    return Api().post('security/register', credentials)
  }
}

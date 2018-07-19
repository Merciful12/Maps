import Api from '@/services/Api'

export default {
  my () {
    return Api().get('markers/')
  },
  edit (marker) {
    return Api().put(`markers/edit`, marker)
  },
  create (marker) {
    return Api().post(`markers/create`, marker)
  }
}

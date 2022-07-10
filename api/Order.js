const resource = '/order'

export default ($axios) => ({
  all() {
    return $axios.get(`${resource}`)
  },
  incomplete() {
    return $axios.get(`${resource}?complete=false&cancelled=false`)
  },
  cancel(id) {
    const payload = {
      cancelled: true,
    }
    return $axios.patch(`${resource}/${id}`, payload)
  },
  complete(id) {
    const payload = {
      complete: true,
    }
    return $axios.patch(`${resource}/${id}`, payload)
  },
})

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
      completedAt: new Date(),
    }
    return $axios.patch(`${resource}/${id}`, payload)
  },
  complete(id) {
    const payload = {
      complete: true,
      completedAt: new Date(),
    }
    return $axios.patch(`${resource}/${id}`, payload)
  },
  create(order) {
    return $axios.post(`${resource}`, order)
  },
})

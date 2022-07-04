const resource = '/food'
export default ($axios) => ({
  all() {
    return $axios.get(`${resource}`)
  },

  get(id) {
    return $axios.get(`${resource}/${id}`)
  },
})

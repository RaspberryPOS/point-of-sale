const resource = '/menu'
export default ($axios) => ({
  all() {
    return $axios.get(`${resource}`)
  },
})

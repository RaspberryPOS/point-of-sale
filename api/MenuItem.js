const resource = '/menuItem'
export default ($axios) => ({
  getByMenu(id) {
    return $axios.get(`${resource}?menuId=${id}`)
  },
})

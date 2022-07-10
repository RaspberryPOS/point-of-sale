const resource = '/orderItem'

export default ($axios) => ({
  setOrderItemReadyStatus(orderItemId, status) {
    const payload = {
      ready: status,
    }
    return $axios.patch(`${resource}/${orderItemId}`, payload)
  },
})

export const state = () => ({
  orders: [],
})

export const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  REMOVE_ORDER(state, orderIndex) {
    state.orders.splice(orderIndex, 1)
  },
  CHANGE_ORDERITEM(state, { orderIndex, orderItemIndex, data }) {
    for (const [key, value] of Object.entries(data)) {
      state.orders[orderIndex].orderItems[orderItemIndex][key] = value
    }
  },
}

export const actions = {
  async getOrders({ commit }) {
    // Get the incomplete (complete == false) orders from the API
    const res = await this.$api.order.incomplete()

    if (res.status === 200 && res.data) {
      commit('SET_ORDERS', res.data)
    } else {
      alert("Couldn't load Orders, refresh the page and try again.")
    }
  },

  async cancelOrder({ state, commit }, orderId) {
    const res = await this.$api.order.cancel(orderId)
    if (res.status === 200 && res.data) {
      // Remove order from state
      const index = state.orders
        .map((x) => {
          return x.id
        })
        .indexOf(orderId)
      commit('REMOVE_ORDER', index)
    } else {
      alert("Couldn't cancel order, refresh the page and try again.")
    }
  },

  async completeOrder({ state, commit }, orderId) {
    const res = await this.$api.order.complete(orderId)
    if (res.status === 200 && res.data) {
      // Remove order from state
      const index = state.orders
        .map((x) => {
          return x.id
        })
        .indexOf(orderId)
      commit('REMOVE_ORDER', index)
    } else {
      alert("Couldn't complete order, refresh the page and try again.")
    }
  },

  async changeOrderItemStatus({ state, commit }, { orderItemId, readyStatus }) {
    const res = await this.$api.orderItem.setOrderItemReadyStatus(
      orderItemId,
      readyStatus
    )
    if (res.status === 200 && res.data) {
      // Change state of the OrderItem in Store
      // find index of order; res.data contains the orderId in it
      const orderIndex = state.orders
        .map((x) => {
          return x.id
        })
        .indexOf(res.data.orderId)
      // find index of orderItem
      const orderItemIndex = state.orders[orderIndex].orderItems
        .map((x) => {
          return x.id
        })
        .indexOf(orderItemId)
      // Commit the change to state
      commit('CHANGE_ORDERITEM', {
        orderIndex,
        orderItemIndex,
        data: { ready: readyStatus },
      })
    } else {
      alert(
        "Couldn't change Order Item status, refresh the page and try again."
      )
    }
  },
}

export const state = () => ({
  items: [],
})

function optionPrice(rootState, option) {
  // Get all selected prepOptions
  const prepOpts = option.prepOpts
    .filter((opt) => opt.selected)
    .map((i) => (i.price ? { price: i.price, qty: i.quantity } : {}))
  // Get all selected foodOptions; map to actual food cost if no override present
  const foodOpts = option.foodOpts
    .filter((opt) => opt.selected)
    .map((i) =>
      i.price
        ? { price: i.price, qty: i.quantity }
        : { price: rootState.food.foodsById[i.foodId].price, qty: i.quantity }
    )
  // Combine all selected opts and expand each price*qty, sort, remove first .freeQty cheapest options
  const allOpts = [...foodOpts, ...prepOpts]
    .map(function (i) {
      const retArray = []
      for (let j = 0; j < i.qty; j++) {
        retArray.push(i.price)
      }
      return retArray
    })
    .flat()
    .sort()
    .slice(option.freeQty)
  // Calculates the price of options
  return allOpts.reduce(
    (partialSum, optionPrice) => partialSum + parseFloat(optionPrice),
    0
  )
}

export const mutations = {
  CLEAR_ORDER(state) {
    state.items = []
  },
  ADD_ITEM(state, item) {
    state.items.push(JSON.parse(JSON.stringify(item)))
  },
  UPDATE_ITEM(state, { item, hash }) {
    for (const i in state.items) {
      if (state.items[i].hash === hash) {
        this._vm.$set(state.items, i, item)
        break
      }
    }
  },
  REMOVE_ITEM(state, itemHash) {
    for (const i in state.items) {
      if (state.items[i].hash === itemHash) {
        state.items.splice(i, 1)
        break
      }
    }
  },
}

export const actions = {
  addOrderItem({ commit, rootState }, item) {
    item.hash = Number(Date.now())

    //  Calcuate cost of each option
    if (item.type === 'MenuItem') {
      for (const j in item.foods) {
        for (const i in item.foods[j].options)
          item.foods[j].options[i].optionsPrice = optionPrice(
            rootState,
            item.foods[j].options[i]
          )
      }
      // Calcuate cost of MenuItem + Selected Options
      item.totalPrice =
        parseFloat(item.price) +
        item.foods.reduce(
          (sum, food) =>
            sum +
            food.options.reduce(
              (partialSum, option) => partialSum + option.optionsPrice,
              0
            ),
          0
        )
    } else {
      // Calculate cost of each selected options
      for (const i in item.options)
        item.options[i].optionsPrice = optionPrice(rootState, item.options[i])
      // Calcuate total cost of order item
      item.totalPrice =
        parseFloat(item.price) +
        item.options.reduce(
          (partialSum, option) => partialSum + option.optionsPrice,
          0
        )
    }

    commit('ADD_ITEM', item)
  },

  updateOrderItem({ commit, rootState }, item) {
    //  Calcuate cost of each option
    if (item.type === 'MenuItem') {
      for (const j in item.foods) {
        for (const i in item.foods[j].options)
          item.foods[j].options[i].optionsPrice = optionPrice(
            rootState,
            item.foods[j].options[i]
          )
      }
      // Calcuate cost of MenuItem + Selected Options
      item.totalPrice =
        parseFloat(item.price) +
        item.foods.reduce(
          (sum, food) =>
            sum +
            food.options.reduce(
              (partialSum, option) => partialSum + option.optionsPrice,
              0
            ),
          0
        )
    } else {
      // Calculate cost of each selected options
      for (const i in item.options)
        item.options[i].optionsPrice = optionPrice(rootState, item.options[i])
      // Calcuate total cost of order item
      item.totalPrice =
        parseFloat(item.price) +
        item.options.reduce(
          (partialSum, option) => partialSum + option.optionsPrice,
          0
        )
    }

    commit('UPDATE_ITEM', { item, hash: item.hash })
  },
}

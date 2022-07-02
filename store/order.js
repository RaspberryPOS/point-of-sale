export const state = () => ({
  items: [],
})

export const mutations = {
  CLEAR_ORDER(state) {
    state.items = []
  },
  ADD_ITEM(state, item) {
    state.items.push(item)
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

export const actions = {}

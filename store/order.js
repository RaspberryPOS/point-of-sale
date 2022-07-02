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
}

export const actions = {}

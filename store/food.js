export const state = () => ({
  foods: [],
  foodsById: {},
})

export const mutations = {
  SET_FOODS(state, foods) {
    for (const i in foods) {
      foods[i].type = 'Food'
      state.foodsById[foods[i].id] = foods[i]
    }
    state.foods = foods
  },
  SET_FOOD_BY_ID(state, food) {
    // Set as Food type
    food.type = 'Food'
    // Check if foods already has the id and update as needed
    for (const i in state.foods) {
      if (state.foods[i].id === food.id) this.$set(state.foods, i, food)
    }
    state.foodsById[food.id] = food
  },
}

export const actions = {
  async getFoods({ commit }) {
    const res = await this.$api.food.all()
    if (res.status === 200 && res.data) {
      // Sort Food by Name and Available state
      // -> Enabled first by Name, then Disabled by Name
      res.data.sort(
        (a, b) => +!a.available - +!b.available || a.name.localeCompare(b.name)
      )
      commit('SET_FOODS', res.data)
    } else {
      alert("Couldn't load Foods, refresh the page and try again.")
    }
  },
  async getFood({ commit }, foodId) {
    const res = await this.$api.food.get(foodId)
    if (res.status === 200 && res.data) {
      commit('SET_FOOD_BY_ID', res.data)
    } else {
      alert("Couldn't load Foods, refresh the page and try again.")
    }
  },
}

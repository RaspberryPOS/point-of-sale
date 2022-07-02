export const state = () => ({
  foods: [],
})

export const mutations = {
  SET_FOODS(state, foods) {
    state.foods = foods
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
}

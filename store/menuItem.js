export const state = () => ({
  menuItems: [],
})

export const mutations = {
  SET_MENUITEMS(state, menuItems) {
    for (const i in menuItems) {
      menuItems[i].type = 'MenuItem'
    }
    state.menuItems = menuItems
  },
}

export const actions = {
  async getMenuItems({ commit }, id) {
    const res = await this.$api.menuItem.getByMenu(id)
    if (res.status === 200 && res.data) {
      // Sort MenuItem by Name and Available state
      // -> Enabled first by Name, then Disabled by Name
      res.data.sort(
        (a, b) => +!a.available - +!b.available || a.name.localeCompare(b.name)
      )
      commit('SET_MENUITEMS', res.data)
    } else {
      // Handle error here
      alert("Couldn't load Menu Items, refresh the page and try again.")
    }
  },
}

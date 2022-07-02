export const state = () => ({
  menus: [],
  selectedMenu: {},
})

export const mutations = {
  SET_MENUS(state, menus) {
    state.menus = menus
  },
  SET_MENU(state, menu) {
    state.selectedMenu = menu
  },
}

export const actions = {
  async getMenus({ commit, dispatch }) {
    const res = await this.$api.menu.all()
    if (res.status === 200 && res.data) {
      // Sort Menus by Name and Active state
      // -> Enabled first by Name, then Disabled by Name
      res.data.sort(
        (a, b) => +!a.active - +!b.active || a.name.localeCompare(b.name)
      )

      // Store menus
      commit('SET_MENUS', res.data)

      // Set selectedMenu to first enabled one if not already set
      if (this.selectedMenu === undefined) {
        let foundActiveMenu = false
        for (const menu of res.data) {
          if (menu.active) {
            await dispatch('setSelectedMenu', menu)
            foundActiveMenu = true
            break
          }
        }
        // Default to first in list
        if (!foundActiveMenu && res.data.length > 0)
          await dispatch('setSelectedMenu', res.data[0])
      } else {
        alert("Couldn't load Menus, refresh the page and try again.")
      }
    }
  },

  async setSelectedMenu({ commit, dispatch }, menu) {
    await commit('SET_MENU', menu)
    // Dispatch getMenuItems for the selected ID to populate store with MenuItems
    await dispatch('menuItem/getMenuItems', menu.id, { root: true })
  },
}

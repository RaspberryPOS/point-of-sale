<template>
  <v-layout>
    <v-container flex style="overflow-x: auto">
      <v-row
        v-for="category in menuItemsByCategory"
        :key="category.id"
        col="12"
      >
        <v-col class="mt-2" cols="12">
          <h2 class="text-uppercase font-weight-light primary--text">
            {{ category.id }}
          </h2>
        </v-col>

        <v-col
          v-for="item in category.items"
          :key="item.id"
          cols="6"
          md="4"
          class="d-flex flex-column ma-0 pa-0"
        >
          <FoodTile :item="item" />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      menuItemsByCategory: {},
    }
  },
  head: {
    title: 'Menu',
  },
  computed: {
    menuItems() {
      return this.$store.state.menuItem.menuItems
    },
  },
  watch: {
    menuItems() {
      // Re-sort MenuItems if Menu changed
      this.sortMenuItems()
    },
  },
  async created() {
    if (this.$store.state.menu.selectedMenu !== undefined)
      await this.$store.dispatch('menuItem/getMenuItems')
    // Sort already saved Vuex MenuItems
    this.sortMenuItems()
  },
  methods: {
    // Sorts VuexStore menu items by Category for display on page
    sortMenuItems() {
      let itemsByCategory = {}
      for (const i in this.menuItems) {
        // Check if category already exists
        if (this.menuItems[i].category in itemsByCategory) {
          itemsByCategory[this.menuItems[i].category].items.push(
            this.menuItems[i]
          )
        } else {
          itemsByCategory[this.menuItems[i].category] = {
            id: this.menuItems[i].category,
            items: [],
          }
          itemsByCategory[this.menuItems[i].category].items.push(
            this.menuItems[i]
          )
        }
      }

      // Order keys in itemsByCategory by Category
      itemsByCategory = Object.keys(itemsByCategory)
        .sort()
        .reduce((obj, key) => {
          obj[key] = itemsByCategory[key]
          return obj
        }, {})

      this.menuItemsByCategory = itemsByCategory
    },
  },
}
</script>

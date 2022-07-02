<template>
  <v-layout pa-2 style="height: 94vh; overflow-y: auto; overflow-x: clip">
    <v-container>
      <v-row
        v-for="category in menuItemsByCategory"
        :key="category.id"
        col="12"
      >
        <v-col class="mt-2" cols="12">
          <h2 class="text-uppercase primary--text">{{ category.id }}</h2>
        </v-col>

        <v-col v-for="item in category.items" :key="item.id" cols="6" md="4">
          <FoodTile
            :name="item.name"
            :description="item.description"
            :available="item.available"
            :price="parseFloat(item.price)"
          />
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
  created() {
    // Sort already saved Vuex MenuItems
    this.sortMenuItems()
  },
  methods: {
    // Sorts VuexStore menu items by Category for display on page
    sortMenuItems() {
      const itemsByCategory = {}
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
      this.menuItemsByCategory = itemsByCategory
    },
  },
}
</script>

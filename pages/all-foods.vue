<template>
  <v-layout>
    <v-container flex style="overflow-x: auto">
      <v-row v-for="category in foodsByCategory" :key="category.id" col="12">
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
      foodsByCategory: {},
    }
  },
  head: {
    title: 'À la carte',
  },
  computed: {
    foods() {
      return this.$store.state.food.foods
    },
  },
  watch: {
    foods() {
      // Re-sort MenuItems if Menu changed
      this.sortFoods()
    },
  },
  async created(ctx) {
    await this.$store.dispatch('food/getFoods')
    this.sortFoods()
  },
  methods: {
    // Sorts VuexStore menu items by Category for display on page
    sortFoods() {
      let itemsByCategory = {}
      for (const i in this.foods) {
        // Check if category already exists
        if (this.foods[i].category in itemsByCategory) {
          itemsByCategory[this.foods[i].category].items.push(this.foods[i])
        } else {
          itemsByCategory[this.foods[i].category] = {
            id: this.foods[i].category,
            items: [],
          }
          itemsByCategory[this.foods[i].category].items.push(this.foods[i])
        }
      }

      // Order keys in itemsByCategory by Category
      itemsByCategory = Object.keys(itemsByCategory)
        .sort()
        .reduce((obj, key) => {
          obj[key] = itemsByCategory[key]
          return obj
        }, {})

      this.foodsByCategory = itemsByCategory
    },
  },
}
</script>

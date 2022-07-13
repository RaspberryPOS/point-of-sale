<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-bottom-transition"
    width="50%"
    scrollable
  >
    <v-card>
      <v-card-title class="primary white--text">
        {{ item.name }}
        <v-spacer />
        <v-btn icon dark @click="showDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text ref="optionList" class="pa-0">
        <div v-if="item.type === 'MenuItem'">
          <div v-for="food in item.foods" :key="food.id">
            <h2
              v-if="item.foods.length > 1"
              class="pl-3 pt-3 text-uppercase font-weight-light primary--text"
            >
              <b>{{ food.name }}</b> Options
            </h2>
            <FoodOptionList :key="Date()" :food="food" />
          </div>
        </div>
        <div v-else>
          <FoodOptionList :key="Date()" :food="item" />
        </div>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="save">
          <span v-if="itemHash">Update</span>
          <span v-else>Add to Order</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FoodOptionList from './FoodOptionList.vue'
export default {
  components: { FoodOptionList },
  data() {
    return {
      showDialog: false,
      item: {},
      itemHash: null,
    }
  },
  mounted() {
    this.$root.$on('showFoodOptionsDialog', ({ item, itemHash }) => {
      // Cleanup any old data
      this.itemHash = null
      this.item = {}
      // If we got itemHash, we're editing, not creating new, find item in store
      if (itemHash) {
        this.itemHash = itemHash
        // Find Order Item in store matching the provided hash
        for (const i in this.$store.state.order.items) {
          if (this.$store.state.order.items[i].hash === itemHash) {
            this.item = JSON.parse(
              JSON.stringify(this.$store.state.order.items[i])
            ) // Make a copy so we can edit in place
            break
          }
        }
      } else {
        this.item = item
        // Sort foods by name if present (passed a MenuItem)
        if (this.item.foods)
          this.item.foods.sort((a, b) =>
            a.name > b.name && b.options.length > a.options.length ? 1 : -1
          )
      }
      this.showDialog = true
      if ('optionList' in this.$refs)
        this.$vuetify.goTo(0, { container: this.$refs.optionList })
    })
  },
  methods: {
    save() {
      // Add net new order item if this isn't an "edit" dialog
      if (!this.itemHash) {
        this.$store.dispatch('order/addOrderItem', this.item)
      } else {
        this.$store.dispatch('order/updateOrderItem', this.item)
      }
      // Close dialog
      this.showDialog = false
    },
  },
}
</script>

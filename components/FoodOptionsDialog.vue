<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-bottom-transition"
    width="50%"
    scrollable
  >
    <v-card>
      <v-card-title class="primary white--text">
        {{ modifiedItem.name }}
        <v-spacer />
        <v-btn icon dark @click="showDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <div v-if="modifiedItem.type === 'MenuItem'">
          <div v-for="food in modifiedItem.foods" :key="food.id">
            <h2
              v-if="modifiedItem.foods.length > 1"
              class="pl-3 pt-3 text-uppercase font-weight-light primary--text"
            >
              <b>{{ food.name }}</b> Options
            </h2>
            <FoodOptionList :food="food" />
          </div>
        </div>
        <div v-else>
          <FoodOptionList :food="modifiedItem" />
        </div>

        <h2
          class="pl-3 pt-3 pb-3 text-uppercase font-weight-light primary--text"
        >
          <b>Special Requests</b>
        </h2>
        <v-textarea v-model="modifiedItem.notes" outlined class="pl-4 pr-4" />
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="save">
          <span v-if="orderItemId">Update</span>
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
  props: {
    orderItemId: {
      type: Number,
      default: NaN,
    },
    item: {
      type: Object,
      required: true,
    },
    visible: Boolean,
  },
  data() {
    return {
      modifiedItem: {},
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      },
    },
  },
  watch: {
    visible() {
      if (this.visible) {
        this.modifiedItem = JSON.parse(JSON.stringify(this.item))
      }
    },
  },
  methods: {
    save() {
      // Add net new order item if this isn't an "edit" dialog
      if (!this.orderItemId) {
        this.$store.dispatch('order/addOrderItem', this.modifiedItem)
      }
      // Close dialog
      this.showDialog = false
    },
  },
}
</script>

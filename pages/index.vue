<template>
  <v-layout>
    <v-container flex style="overflow-x: auto">
      <v-row col="12">
        <v-col
          v-for="(id, index) in ordersOldToNew"
          :key="index"
          cols="12"
          md="6"
          class="d-flex flex-column"
        >
          <OrderCard :order="parsedOrders[id]" />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {}
  },
  head: {
    title: 'Orders',
  },
  computed: {
    orders() {
      return this.$store.state.submittedOrders.orders
    },
    parsedOrders() {
      return JSON.parse(JSON.stringify(this.orders)).reduce(function (
        result,
        order,
        index,
        array
      ) {
        // Parse fields in order to appropriate format first
        order.orderNumber = String(order.orderNumber).padStart(3, '0')
        order.createdAt = new Date(order.createdAt)
        order.completedAt = new Date(order.completedAt)
        order.totalPrice = parseFloat(order.totalPrice)

        // Iterate over all order items and process to more useful form
        order.categoryMapping = {} // Create a mappoing of all order categories and which orderItem.id is in each
        order.menuItemMapping = {} // Create a mapping of all orderItems that are part of the same menuItem (grouping of multiple foods in a single order-able selection)
        order.orderToMenuItemHashMap = {} // Hold the "inverse" of .menuItemMapping {orderId: menuItemhash}
        order.singleItemMapping = [] // Create a list of all IDs that aren't part of a menuItem (a-la-cart items)
        order.orderIdIndex = {}

        for (const [index, item] of order.orderItems.entries()) {
          // Note index of OrderItem.id
          order.orderIdIndex[item.id] = index
          // Find orderItem category and store in Category mapping
          const orderCategory = item.menuItem?.category
            ? item.menuItem.category
            : item.food?.category
            ? item.food.category
            : 'Other'
          if (orderCategory in order.categoryMapping)
            order.categoryMapping[orderCategory].push(item.id)
          else order.categoryMapping[orderCategory] = [item.id]

          // Find orderItems part of a menuItem and the same menuItemhash and note
          if (item.menuItemhash && item.menuItem) {
            order.orderToMenuItemHashMap[item.id] = item.menuItemhash
            if (item.menuItemhash in order.menuItemMapping)
              order.menuItemMapping[item.menuItemhash].orderItemIds.push(
                item.id
              )
            else
              order.menuItemMapping[item.menuItemhash] = {
                menuItem: item.menuItem,
                orderItemIds: [item.id],
              }
          } else {
            order.singleItemMapping.push(item.id)
          }

          // simplifiy options
          const optionsTemp = {}
          for (const option of item.options) {
            // Add quantity to optionFood/optionPrep
            if (option.optionFood) option.optionFood.quantity = option.quantity
            if (option.optionPrep) option.optionPrep.quantity = option.quantity

            // Check if Option ID already in new Options Object
            if (option.option.id in optionsTemp) {
              // Add new optionFood/optionPrep and sort by name
              if (option.optionFood)
                optionsTemp[option.option.id].optionFood.push(option.optionFood)
              if (option.optionPrep)
                optionsTemp[option.option.id].optionPrep.push(option.optionPrep)
              // Sort by name
              optionsTemp[option.option.id].optionFood.sort((a, b) =>
                a.food.name > b.food.name ? 1 : -1
              )
              optionsTemp[option.option.id].optionPrep.sort((a, b) =>
                a.name > b.name ? 1 : -1
              )
            } else {
              // Create new object to represent options
              optionsTemp[option.option.id] = {
                option: option.option,
                optionFood: [],
                optionPrep: [],
              }
              if (option.optionFood)
                optionsTemp[option.option.id].optionFood.push(option.optionFood)
              if (option.optionPrep)
                optionsTemp[option.option.id].optionPrep.push(option.optionPrep)
            }
          }
          item.options = optionsTemp

          // remove now un-needed keys
          delete item.menuItem
          delete item.menuItemhash
        }

        // Done!
        console.log(order)
        result[order.id] = order
        return result
      },
      {})
    },
    ordersOldToNew() {
      return Object.keys(this.parsedOrders).sort(
        (a, b) =>
          this.parsedOrders[a].createdAt - this.parsedOrders[b].createdAt
      )
    },
  },
  watch: {},
  async created(ctx) {
    await this.$store.dispatch('submittedOrders/getOrders')
  },
  methods: {},
}
</script>

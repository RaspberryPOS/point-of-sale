<template>
  <v-layout>
    <v-container fluid>
      <VueHorizontal
        v-if="ordersOldToNew.length > 0"
        scroll
        class="ml-5 mr-5 horizontal"
      >
        <v-col
          v-for="(id, index) in ordersOldToNew"
          :key="index"
          cols="12"
          md="5"
        >
          <OrderCard :order="orders[id]" />
        </v-col>
      </VueHorizontal>
      <v-row v-else>
        <v-col class="text-h2 mt-7 primary--text text-center">
          No orders :(
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
const faye = require('faye')
export default {
  data() {
    return {}
  },
  head: {
    title: 'Orders',
  },
  computed: {
    orders() {
      return this.$store.state.orders.orders
    },
    ordersOldToNew() {
      return Object.keys(this.orders).sort(
        (a, b) => this.orders[a].createdAt - this.orders[b].createdAt
      )
    },
  },
  watch: {},
  async mounted(ctx) {
    // Get Orders from backend
    await this.$store.dispatch('orders/getOrders')
    // Setup Faye listeners
    const fayeClient = new faye.Client('http://localhost:8080/faye')

    // Listen for order patches (cancelled or complete) and remove and alert cook
    fayeClient.subscribe('/order/patch', (order) => {
      if (order.complete || order.cancelled) {
        this.$store.commit('orders/REMOVE_ORDER', order.id)
        // Alert cook
        if (order.complete) {
          this.$dialog.notify.success(
            `Order ${String(order.orderNumber).padStart(3, '0')} completed!`,
            { position: 'top-left', timeout: 5000 }
          )
        } else {
          this.$dialog.notify.error(
            `Order ${String(order.orderNumber).padStart(3, '0')} cancelled!`,
            { position: 'top-left', timeout: 0 }
          )
        }
      }
    })

    // Listen for new orders (/order/post)
    fayeClient.subscribe('/order/post', (order) => {
      // Alert cook
      this.$dialog.notify.info(
        `New order (${String(order.orderNumber).padStart(3, '0')}) received!`,
        { position: 'top-left', timeout: 5000 }
      )
      // Add order to store
      this.$store.dispatch('orders/addOrder', order)
    })

    // Listen for orderItem changes
    // firing, fired, ready
    fayeClient.subscribe('/orderItem/patch', (orderItem) => {
      this.$store.commit('orders/CHANGE_ORDERITEM_STATUS', {
        orderId: orderItem.orderId,
        orderItemId: orderItem.id,
        key: 'fired',
        value: orderItem.fired,
      })
      this.$store.commit('orders/CHANGE_ORDERITEM_STATUS', {
        orderId: orderItem.orderId,
        orderItemId: orderItem.id,
        key: 'firedTime',
        value: orderItem.firedTime,
      })
      this.$store.commit('orders/CHANGE_ORDERITEM_STATUS', {
        orderId: orderItem.orderId,
        orderItemId: orderItem.id,
        key: 'firing',
        value: orderItem.firing,
      })
      this.$store.commit('orders/CHANGE_ORDERITEM_STATUS', {
        orderId: orderItem.orderId,
        orderItemId: orderItem.id,
        key: 'firingTime',
        value: orderItem.firingTime,
      })
      this.$store.commit('orders/CHANGE_ORDERITEM_STATUS', {
        orderId: orderItem.orderId,
        orderItemId: orderItem.id,
        key: 'ready',
        value: orderItem.ready,
      })
    })
  },
  methods: {},
}
</script>

<style scoped>
.horizontal >>> .v-hl-container {
  /* For firefox only */
  scrollbar-width: thin;
  scrollbar-color: grey;
}

.horizontal >>> .v-hl-container::-webkit-scrollbar {
  height: 16px;
  width: 16px;
  background: transparent;
}

.horizontal >>> .v-hl-container::-webkit-scrollbar-track {
  border-radius: 4px;
}

.horizontal >>> .v-hl-container::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: grey;
}
</style>

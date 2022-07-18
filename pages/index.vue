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

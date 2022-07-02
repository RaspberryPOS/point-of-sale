<template>
  <v-card :color="item.available ? '' : 'grey lighten-2'" height="100%">
    <v-card-title>
      {{ item.name }}
    </v-card-title>
    <v-card-subtitle>
      <MoneyFormat
        :value="parseFloat(item.price)"
        locale="en"
        currency-code="USD"
        :subunits-value="false"
      />
    </v-card-subtitle>
    <v-card-text height="100%">
      {{ item.description }}
    </v-card-text>
    <v-card-actions>
      <v-chip :color="item.available ? 'green' : 'red'" outlined small>
        <span v-if="item.available">
          <v-icon small>mdi-check</v-icon>
          Available
        </span>
        <span v-else>
          <v-icon small>mdi-close</v-icon>
          Not Available
        </span>
      </v-chip>

      <v-spacer></v-spacer>

      <v-btn
        :disabled="!item.available"
        fab
        color="primary"
        @click="addToOrder(JSON.parse(JSON.stringify(item)))"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToOrder(item) {
      item.hash = Number(Date.now())
      // Check if MenuItem or Food being added
      if ('foods' in item) item.type = 'MenuItem'
      else item.type = 'Food'
      this.$store.commit('order/ADD_ITEM', item)
    },
  },
}
</script>

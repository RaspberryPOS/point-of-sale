<template>
  <div>
    <v-list-item-subtitle v-for="opt in food.options" :key="opt.id">
      <span v-if="opt.foodOpts.some((opt) => opt.selected)">
        <span class="font-weight-light green--text caption">
          <MoneyFormat
            :value="opt.optionsPrice"
            locale="en"
            currency-code="USD"
            :subunits-value="false"
            style="display: inline"
          />
        </span>
        <strong>{{ opt.name }}: </strong
        >{{
          opt.foodOpts
            .filter((opt) => opt.selected)
            .map((i) => `${i.quantity}x ${foodsById[i.foodId].name}`)
            .join(', ')
        }}
      </span>
      <span v-if="opt.prepOpts.some((opt) => opt.selected)">
        <span class="font-weight-light green--text caption">
          <MoneyFormat
            :value="opt.optionsPrice"
            locale="en"
            currency-code="USD"
            :subunits-value="false"
            style="display: inline"
          />
        </span>
        <strong>{{ opt.name }}: </strong
        >{{
          opt.prepOpts
            .filter((opt) => opt.selected)
            .map((i) => `${i.quantity > 0 ? i.quantity + 'x ' : ''}${i.name}`)
            .join(', ')
        }}
      </span>
    </v-list-item-subtitle>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    foodsById() {
      return this.$store.state.food.foodsById
    },
  },
  watch: {},
  methods: {},
}
</script>

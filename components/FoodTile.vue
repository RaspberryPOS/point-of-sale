<template>
  <v-container class="flex d-flex flex-column">
    <v-card
      :color="itemAvailable ? '' : 'grey lighten-2'"
      class="flex d-flex flex-column"
    >
      <v-card-title>
        <span class="primary--text">{{ item.name }}</span>
      </v-card-title>
      <v-card-subtitle class="font-weight-light green--text">
        <MoneyFormat
          :value="parseFloat(item.price)"
          locale="en"
          currency-code="USD"
          :subunits-value="false"
        />
      </v-card-subtitle>
      <v-card-text class="flex">
        {{ item.description }}
      </v-card-text>
      <v-card-actions>
        <v-chip :color="itemAvailable ? 'green' : 'red'" outlined small>
          <span v-if="itemAvailable">
            <v-icon small>mdi-check</v-icon>
            Available
          </span>
          <span v-else>
            <v-icon small>mdi-close</v-icon>
            Not Available
          </span>
        </v-chip>

        <v-spacer></v-spacer>

        <v-badge
          :color="itemAvailable ? 'primary darken-4' : 'grey'"
          icon="mdi-cog"
          overlap
          bordered
          :value="itemHasOptions"
        >
          <v-btn
            x-large
            :disabled="!itemAvailable"
            color="primary"
            @click="addToOrderButton"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-badge>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    itemAvailable() {
      // Checks overall avaibility of item -- MenuItem's aren't availabe if any Food isn't available
      // For MenuItem types, check if all the Foods are available, even if MenuItem marked available
      if (this.item.type === 'MenuItem' && this.item.available) {
        // Check if the sub-foods are note available
        let overallAvailable = true
        for (const i in this.item.foods) {
          if (!this.item.foods[i].available) {
            overallAvailable = false
            break
          }
        }
        return overallAvailable
      } else {
        return this.item.available
      }
    },
    itemHasOptions() {
      if (
        this.item.type === 'Food' &&
        'options' in this.item &&
        this.item.options.length > 0
      ) {
        return true
      } else if (
        this.item.type === 'MenuItem' &&
        'foods' in this.item &&
        this.item.foods.length > 0
      ) {
        // Check if the sub-foods have any options
        let anyFoodHasOpts = false
        for (const i in this.item.foods) {
          if (
            'options' in this.item.foods[i] &&
            this.item.foods[i].options.length > 0
          ) {
            anyFoodHasOpts = true
            break
          }
        }
        return anyFoodHasOpts
      } else {
        return false
      }
    },
  },
  methods: {
    addToOrderButton() {
      // Show option selector dialog if item has options
      if (this.itemHasOptions) {
        this.$root.$emit('showFoodOptionsDialog', {
          item: JSON.parse(JSON.stringify(this.item)),
        })
      } else {
        // Make copy of item to add to Vuex Store
        this.$store.dispatch(
          'order/addOrderItem',
          JSON.parse(JSON.stringify(this.item))
        )
      }
    },
  },
}
</script>

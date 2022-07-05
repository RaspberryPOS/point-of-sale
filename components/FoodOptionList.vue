<template>
  <div>
    <v-list v-for="opt in food.options" :key="opt.id" subheader two-line flat>
      <v-subheader>
        <strong>{{ opt.name }}</strong>
        <v-spacer />
        <span class="float-right text-right">
          <span v-text="opt.multiselect ? 'Multiselect' : 'Single-select'" />
          <span v-if="opt.multiOrder || opt.multiselect">
            <br />Free: {{ opt.freeQty }}
          </span>
        </span>
      </v-subheader>

      <v-list-item-group :multiple="opt.multiselect">
        <v-list-item
          v-for="prep in opt.prepOpts"
          :key="prep.id"
          v-model="prep.selected"
        >
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary" />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ prep.name }}</v-list-item-title>
              <v-list-item-subtitle>
                <span class="font-weight-light green--text"
                  ><MoneyFormat
                    :value="parseFloat(prep.price)"
                    locale="en"
                    currency-code="USD"
                    :subunits-value="false"
                /></span>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action v-if="opt.multiOrder" @click.stop>
              <div class="flex">
                <v-btn
                  :disabled="!prep.selected"
                  depressed
                  color="error"
                  v-on="
                    prep.quantity > 1 ? { click: () => prep.quantity-- } : {}
                  "
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-chip label outlined :disabled="!prep.selected">
                  {{ prep.quantity }}
                </v-chip>
                <v-btn
                  :disabled="!prep.selected"
                  depressed
                  color="success"
                  @click="prep.quantity++"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-list-item-action>
          </template>
        </v-list-item>

        <v-list-item
          v-for="relatedFood in opt.foodOpts"
          :key="relatedFood.foodId"
          v-model="relatedFood.selected"
          :disabled="!foodsById[relatedFood.foodId].available"
        >
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="primary"
                :disabled="!foodsById[relatedFood.foodId].available"
              />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{
                foodsById[relatedFood.foodId].name
              }}</v-list-item-title>
              <v-list-item-subtitle
                v-if="foodsById[relatedFood.foodId].available"
              >
                <span class="font-weight-light green--text"
                  ><MoneyFormat
                    style="display: inline"
                    :value="
                      parseFloat(
                        relatedFood.price || foodsById[relatedFood.foodId].price
                      )
                    "
                    locale="en"
                    currency-code="USD"
                    :subunits-value="false"
                /></span>
                <span v-if="foodsById[relatedFood.foodId].description">
                  - {{ foodsById[relatedFood.foodId].description }}</span
                >
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else>
                <span class="font-weight-light red--text text--lighten-3"
                  >Not Available</span
                >
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action
              v-if="opt.multiOrder && foodsById[relatedFood.foodId].available"
              @click.stop
            >
              <div class="flex">
                <v-btn
                  :disabled="!relatedFood.selected"
                  depressed
                  color="error"
                  v-on="
                    relatedFood.quantity > 1
                      ? { click: () => relatedFood.quantity-- }
                      : {}
                  "
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-chip label outlined :disabled="!relatedFood.selected">
                  {{ relatedFood.quantity }}
                </v-chip>
                <v-btn
                  :disabled="!relatedFood.selected"
                  depressed
                  color="success"
                  @click="relatedFood.quantity++"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list-item-group>
      <v-divider />
    </v-list>
    <v-subheader>
      <strong>Special Requests</strong>
    </v-subheader>
    <v-textarea v-model="notes" outlined class="pl-4 pr-4" />
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
    return {
      notes: '',
    }
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

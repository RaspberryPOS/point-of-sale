<!-- eslint-disable vue/no-mutating-props -->
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

      <v-list-item-group
        v-if="selectedOpts[opt.id]"
        v-model="selectedOpts[opt.id]['prepOpts']"
        :multiple="opt.multiselect"
      >
        <v-list-item
          v-for="prep in opt.prepOpts"
          :key="prep.id"
          :value="prep.id"
          @click="selectedOptsClicked++"
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
                  :disabled="
                    !selectedOpts[opt.id]['prepOpts'].includes(prep.id)
                  "
                  depressed
                  color="error"
                  v-on="
                    prep.quantity > 1 ? { click: () => prep.quantity-- } : {}
                  "
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-chip
                  label
                  outlined
                  :disabled="
                    !selectedOpts[opt.id]['prepOpts'].includes(prep.id)
                  "
                >
                  {{ prep.quantity }}
                </v-chip>
                <v-btn
                  :disabled="
                    !selectedOpts[opt.id]['prepOpts'].includes(prep.id)
                  "
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
      </v-list-item-group>

      <v-list-item-group
        v-if="selectedOpts[opt.id]"
        v-model="selectedOpts[opt.id]['foodOpts']"
        :multiple="opt.multiselect"
      >
        <v-list-item
          v-for="relatedFood in opt.foodOpts"
          :key="relatedFood.id"
          :value="relatedFood.id"
          :disabled="!foodsById[relatedFood.foodId].available"
          @click="selectedOptsClicked++"
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
                  :disabled="
                    !selectedOpts[opt.id]['foodOpts'].includes(relatedFood.id)
                  "
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
                <v-chip
                  label
                  outlined
                  :disabled="
                    !selectedOpts[opt.id]['foodOpts'].includes(relatedFood.id)
                  "
                >
                  {{ relatedFood.quantity }}
                </v-chip>
                <v-btn
                  :disabled="
                    !selectedOpts[opt.id]['foodOpts'].includes(relatedFood.id)
                  "
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
    <v-textarea v-model="food.notes" outlined class="pl-4 pr-4" />
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
      selectedOpts: {},
      selectedOptsClicked: 0,
    }
  },
  computed: {
    foodsById() {
      return this.$store.state.food.foodsById
    },
  },
  watch: {
    // Clicking on v-list-item increments the counter, allowing us to trigger updating the
    // underlying food prop with the selected items
    selectedOptsClicked() {
      // iterate each option id
      this.food?.options?.forEach((opt) => {
        // Set each foodOpt to be (not) selected according to selectedOpts
        opt.foodOpts.map((o) => {
          if (
            (this.selectedOpts[opt.id]?.foodOpts?.constructor.name ===
              'Array' &&
              this.selectedOpts[opt.id]?.foodOpts?.includes(o.id)) ||
            this.selectedOpts[opt.id]?.foodOpts === o.id
          )
            o.selected = true
          else o.selected = false
          return o
        })
        opt.prepOpts.map((o) => {
          if (
            (this.selectedOpts[opt.id]?.prepOpts?.constructor.name ===
              'Array' &&
              this.selectedOpts[opt.id].prepOpts.includes(o.id)) ||
            this.selectedOpts[opt.id].prepOpts === o.id
          )
            o.selected = true
          else o.selected = false
          return o
        })
      })
    },
  },
  created() {
    // Check if foodNotes in food and add key if needed
    if (!('notes' in this.food)) {
      // eslint-disable-next-line vue/no-mutating-props
      this.food.notes = ''
    }
    // Process food options and sotre selected opt ids to array for use in v-list-item-group's
    this.food?.options?.forEach((opt) => {
      this.selectedOpts[opt.id] = {}
      // Iterate through foodOpts
      this.selectedOpts[opt.id].foodOpts = opt.foodOpts
        .filter((o) => o.selected)
        .map((o) => {
          return o.id
        })
      // Select first foodOpt if multiselect not allowed -> converting the property to a string instead of array in process
      if (!opt.multiselect && this.selectedOpts[opt.id].foodOpts.length > 0)
        this.selectedOpts[opt.id].foodOpts =
          this.selectedOpts[opt.id].foodOpts[0]

      // Same for prepOpts
      this.selectedOpts[opt.id].prepOpts = opt.prepOpts
        .filter((o) => o.selected)
        .map((o) => {
          return o.id
        })
      if (!opt.multiselect && this.selectedOpts[opt.id].prepOpts.length > 0)
        this.selectedOpts[opt.id].prepOpts =
          this.selectedOpts[opt.id].prepOpts[0]
    })
  },
}
</script>

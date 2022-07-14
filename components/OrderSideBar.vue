<template>
  <v-navigation-drawer :value="show" app dark right width="400" fill-height>
    <v-layout column class="fill-height">
      <v-flex class="flex shrink">
        <v-list subheader two-line class="mt-0 mb-0 pb-0">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6"
                >Current Order</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-btn fab small color="red" @click="clearOrder">
                <v-icon color="white">mdi-cancel</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>

      <!-- List of Items in Order -->
      <v-flex class="flex overflow-auto grey darken-4">
        <v-list subheader two-line class="mt-1">
          <v-list-item v-for="item in order" :key="item.hash" class="pl-0 pr-1">
            <!-- Remove from Order Button -->
            <v-list-item-action class="pl-1 pr-1 ma-0">
              <v-btn icon @click="removeItem(item.hash)">
                <v-icon color="red">mdi-minus-circle-outline</v-icon>
              </v-btn>
            </v-list-item-action>

            <!-- Item info -->
            <v-list-item-content class="mr-1">
              <!-- Item name -->
              <v-list-item-title
                class="subtitle-1 font-weight-bold accent--text text--lighten-1"
              >
                <MoneyFormat
                  :value="parseFloat(item.price)"
                  locale="en"
                  currency-code="USD"
                  :subunits-value="false"
                  style="display: inline"
                  class="font-weight-light green--text caption"
                />{{ item.name }}
              </v-list-item-title>

              <!-- Selected Options -->
              <div v-if="item.type === 'MenuItem'">
                <div v-for="food in item.foods" :key="food.id">
                  <h5 v-if="item.foods.length > 1" class="pl-9 primary--text">
                    {{ food.name }}
                  </h5>
                  <OrderSideBarDetail :food="food" />
                </div>
              </div>
              <div v-else>
                <OrderSideBarDetail :food="item" />
              </div>
            </v-list-item-content>

            <!-- Show total price of item -->
            <v-list-item-action class="font-weight-light green--text">
              <MoneyFormat
                :value="item.totalPrice"
                locale="en"
                currency-code="USD"
                :subunits-value="false"
              >
              </MoneyFormat>
            </v-list-item-action>

            <!-- Edit item button -->
            <v-list-item-action class="ml-1">
              <v-btn icon>
                <v-icon color="grey lighten-1" @click="editItem(item.hash)"
                  >mdi-note-edit</v-icon
                >
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>

      <v-flex class="flex shrink pb-2">
        <!-- Show Total -->
        <v-toolbar color="rgba(0,0,0,0)" flat>
          <strong>Total</strong><v-spacer></v-spacer
          ><strong>
            <MoneyFormat
              :value="orderTotal"
              locale="en"
              currency-code="USD"
              :subunits-value="false"
            />
          </strong>
        </v-toolbar>

        <!-- Payment Method Selector -->
        <v-item-group v-model="paymentMethod" mandatory class="mt-n1">
          <v-container>
            <v-row justify="center">
              <v-col>
                <v-item v-slot="{ active, toggle }" value="Cash">
                  <v-card
                    :color="active ? 'grey lighten-2' : ''"
                    class="d-flex align-center rounded-lg"
                    height="70"
                    flat
                    @click="toggle"
                  >
                    <v-row>
                      <v-col>
                        <v-list-item three-line class="text-center mt-1">
                          <v-list-item-content>
                            <div>
                              <v-icon :color="active ? 'black' : 'white'"
                                >mdi-cash-100</v-icon
                              >
                            </div>
                            <v-list-item-subtitle
                              :class="active ? 'black--text' : 'white--text'"
                              class="mt-n2 caption"
                              >Cash</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-item>
              </v-col>
              <v-col>
                <v-item v-slot="{ active, toggle }" value="Card">
                  <v-card
                    :color="active ? 'grey lighten-2' : ''"
                    class="d-flex align-center rounded-lg"
                    height="70"
                    flat
                    @click="toggle"
                  >
                    <v-row>
                      <v-col>
                        <v-list-item three-line class="text-center mt-1">
                          <v-list-item-content>
                            <div>
                              <v-icon :color="active ? 'black' : 'white'"
                                >mdi-credit-card</v-icon
                              >
                            </div>
                            <v-list-item-subtitle
                              :class="active ? 'black--text' : 'white--text'"
                              class="mt-n2 caption"
                              >Card</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>

        <!-- Submit Order -->
        <div class="mx-3 mt-2">
          <v-btn
            block
            large
            :disabled="order.length == 0"
            color="success"
            height="70"
            @click="submitOrder"
            >Submit Order</v-btn
          >
        </div>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
      paymentMethod: 'Cash',
    }
  },
  computed: {
    order() {
      return this.$store.state.order.items
    },
    orderTotal() {
      return this.order.reduce(
        (partialSum, item) => partialSum + item.totalPrice,
        0
      )
    },
  },
  methods: {
    async clearOrder() {
      const confirm = await this.$dialog.confirm({
        text: 'Do you really want to clear the current order?',
        title: 'Clear Order',
        actions: {
          false: { text: 'No', large: true, flat: false },
          true: { text: 'Yes', color: 'primary', large: true, flat: false },
        },
      })
      if (confirm) {
        this.$store.commit('order/CLEAR_ORDER')
      }
    },
    removeItem(itemHash) {
      this.$store.commit('order/REMOVE_ITEM', itemHash)
    },
    editItem(itemHash) {
      this.$root.$emit('showFoodOptionsDialog', { itemHash })
    },
    async submitOrder() {
      // Helper function to "explode" OptionFood and OptionPrep to OrderItemOption
      function parseOptions(options) {
        const orderOpts = []
        // iterate through each option on the Food
        options.forEach((option) => {
          const parsedOpt = {
            optionId: option.id,
            totalPrice: option.totalPrice,
          }
          orderOpts.push(
            ...option.prepOpts
              .filter((opt) => opt.selected)
              .map((opt) => {
                const prepOpt = { ...parsedOpt }
                prepOpt.quantity = opt.quantity
                prepOpt.optionPrepId = opt.id
                return prepOpt
              })
          )
          orderOpts.push(
            ...option.foodOpts
              .filter((opt) => opt.selected)
              .map((opt) => {
                const foodOpt = { ...parsedOpt }
                foodOpt.quantity = opt.quantity
                foodOpt.optionFoodId = opt.id
                return foodOpt
              })
          )
        })
        return orderOpts
      }
      // Create Order data for POST
      const orderData = {
        totalPrice: this.orderTotal,
        paymentMethod: this.paymentMethod,
        orderItems: [],
      }
      // Iterate through copy of order items (so we don't mutate vuex)
      this.order.forEach((item) => {
        // If item has .foods, it's a menu item, explode out
        if ('foods' in item) {
          item.foods.forEach((food) => {
            const orderItem = {
              foodId: food.id,
              foodNotes: food.notes,
              menuItemId: item.id,
              menuItemhash: String(item.hash),
              totalPrice: item.totalPrice,
              options: parseOptions(food.options),
            }
            orderData.orderItems.push(orderItem)
          })
        } else {
          const orderItem = {
            foodId: item.id,
            foodNotes: item.notes,
            totalPrice: item.totalPrice,
            options: parseOptions(item.options),
          }
          orderData.orderItems.push(orderItem)
        }
      })

      const orderRecord = await this.$api.order.create(orderData)
      // Show order success dialog
      if (orderRecord.status === 200) {
        // Show success popup and allow printing (extra) receipts
        this.$root.$emit('showOrderSubmittedDialog', {
          order: orderRecord.data,
        })
        // Reset things
        this.$store.commit('order/CLEAR_ORDER')
        this.paymentMethod = 'Cash'
      } else {
        alert('Something went wrong submitting order, try again!')
        // eslint-disable-next-line no-console
        console.error(orderRecord)
      }
    },
  },
}
</script>

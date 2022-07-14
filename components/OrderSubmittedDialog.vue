<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-top-transition"
    width="50%"
    scrollable
  >
    <v-card height="60vh" color="success">
      <v-card-title class="success darken-2 white--text">
        <v-spacer />
        <v-btn icon dark @click="showDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text class="text-center">
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col>
              <div class="text-h1 white--text">
                {{ String(order.orderNumber || 0).padStart(3, '0') }}
              </div>
              <div class="text-subtitle-2 white--text">Order Number</div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-btn text color="white" x-large @click="printWindowTag">
          <v-icon left> mdi-printer </v-icon>
          Order Number
        </v-btn>
        <v-spacer />
        <v-btn text color="white" x-large @click="printCustomerReceipt">
          <v-icon left> mdi-printer </v-icon>
          Order Receipt
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      order: {},
    }
  },
  mounted() {
    this.$root.$on('showOrderSubmittedDialog', ({ order }) => {
      this.showDialog = true
      this.order = order
    })
  },
  methods: {
    printCustomerReceipt() {
      // Add net new order item if this isn't an "edit" dialog
      alert('PRINTING CUSTOMER RECEIPT')
    },
    printWindowTag() {
      // Add net new order item if this isn't an "edit" dialog
      alert('PRINTING WINDOW RECEIPT')
    },
  },
}
</script>

<template>
  <v-card :color="available ? '' : 'grey lighten-2'" height="100%">
    <v-card-title>
      {{ name }}
    </v-card-title>
    <v-card-subtitle>
      <MoneyFormat
        :value="price"
        locale="en"
        currency-code="USD"
        :subunits-value="false"
      >
      </MoneyFormat>
    </v-card-subtitle>
    <v-card-text>
      {{ description }}
    </v-card-text>
    <v-card-actions>
      <v-chip :color="available ? 'green' : 'red'" outlined small>
        <span v-if="available">
          <v-icon small>mdi-check</v-icon>
          Available
        </span>
        <span v-else>
          <v-icon small>mdi-close</v-icon>
          Not Available
        </span>
      </v-chip>

      <v-spacer></v-spacer>

      <v-btn :disabled="!available" fab color="primary">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: 'None',
    },
    available: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
  },
}
</script>

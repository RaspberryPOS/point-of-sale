<template>
  <v-layout pa-2 style="height: 95vh; overflow-y: auto; overflow-x: clip">
    <v-row>
      <v-col class="mt-2" cols="12">
        <h2 class="text-uppercase primary--text">Combos</h2>
      </v-col>

      <v-col v-for="food in foods" :key="food.id" cols="6" md="4">
        <FoodTile
          :name="food.name"
          :description="food.description"
          :available="food.available"
          :price="parseFloat(food.price)"
        />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData(context) {
    const foods = await context.app.$axios.$get(
      'http://192.168.1.84:8080/menuItem'
    )
    return { foods }
  },
}
</script>

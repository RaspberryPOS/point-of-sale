<template>
  <v-app dark>
    <fullscreen v-model="fullscreen">
      <v-navigation-drawer v-model="leftDrawer" :clipped="clipped" fixed app>
        <v-list>
          <v-list-item>
            <v-select
              v-model="selectedMenu"
              :items="menus"
              item-text="name"
              item-value="id"
              label="Menu"
              return-object
            ></v-select>
          </v-list-item>

          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="leftDrawer = !leftDrawer" />
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn v-if="!fullscreen" icon @click="makeFullscreen">
          <v-icon>mdi-arrow-expand</v-icon>
        </v-btn>
        <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon>mdi-receipt</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <Nuxt />
      </v-main>
      <OrderSideBar :show="rightDrawer" />
    </fullscreen>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      fullscreen: false,
      clipped: true,
      leftDrawer: true,
      rightDrawer: true,
      items: [
        {
          icon: 'mdi-order-bool-descending-variant',
          title: 'Orders',
          to: '/',
        },
        {
          icon: 'mdi-food',
          title: 'Menu',
          to: '/menu',
        },
        {
          icon: 'mdi-hamburger',
          title: 'All Foods',
          to: '/all-foods',
        },
      ],
      title: 'RaspberryPOS',
    }
  },
  head: {
    title: 'Home',
  },
  computed: {
    selectedMenu: {
      get: function () {
        return this.$store.state.menu.selectedMenu
      },
      set: function (newValue) {
        this.$store.dispatch('menu/setSelectedMenu', newValue)
      },
    },
    menus() {
      return this.$store.state.menu.menus
    },
  },
  async created() {
    await this.$store.dispatch('menu/getMenus')
    await this.$store.dispatch('food/getFoods')
  },
  methods: {
    makeFullscreen() {
      this.fullscreen = !this.fullscreen
    },
  },
}
</script>

<style scoped>
:fullscreen,
::backdrop {
  background-color: rgb(255 255 255);
}
</style>

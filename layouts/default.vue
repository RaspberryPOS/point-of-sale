<template>
  <v-app dark>
    <fullscreen v-model="fullscreen">
      <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
        <v-list>
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
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title v-text="title" />
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
      drawer: false,
      items: [
        {
          icon: 'mdi-food',
          title: 'Menu',
          to: '/',
        },
        {
          icon: 'mdi-hamburger',
          title: 'À la carte',
          to: '/',
        },
      ],
      rightDrawer: true,
      title: 'RaspberryPOS',
    }
  },
  head: {
    title: 'Home',
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

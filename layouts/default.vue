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
        <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-btn v-if="!fullscreen" icon @click="makeFullscreen">
          <v-icon>mdi-arrow-expand</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
      <v-navigation-drawer v-model="rightDrawer" right temporary fixed>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon light> mdi-currency-usd </v-icon>
            </v-list-item-action>
            <v-list-item-title>Thing</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
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
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      rightDrawer: false,
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

<template>
  <v-app
    white
    :class="`lay-cover ${$vuetify.breakpoint.xs || $vuetify.breakpoint.sm || $vuetify.breakpoint.md ? 'mini': 'normal' }`"
  >
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
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
    </v-navigation-drawer> -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title>
        <nuxt-link to="/">
          <img
            style="height: 68px;"
            src="~/assets/torrunx.png"
          />
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-list style="padding: 4px;">
        <v-list-item>
          <v-list-item-action>
            <LOGIN />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <LOGIN />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </v-app>
</template>

<script>
import LOGIN from '@/components/Login'
export default {
  components: {
    LOGIN,
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        // {
        //   icon: 'mdi-apps',
        //   title: 'Welcome',
        //   to: '/'
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire'
        // }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Web Tor'
    }
  }
}
</script>

<style lang="scss">
a {
  text-decoration: none;
}
body {
  background-color: black;
}
</style>
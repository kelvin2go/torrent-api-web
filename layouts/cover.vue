<template>
  <v-app white>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title>
        <nuxt-link to="/">
          <img
            style="height: 68px;"
            src="~/assets/torrunx.png"
          />
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <LOGIN />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-app-bar>
    <v-content>
      <nuxt />
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
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  }
}
</script>
<style lang="scss">
#__layout {
  background-color: black;
}
a {
  text-decoration: none;
}
#__nuxt {
  background-color: black;
  height: 140vw;
}
</style>
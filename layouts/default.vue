<template>
  <v-app
    white
    :class="`lay-cover ${
      $vuetify.breakpoint.xs || $vuetify.breakpoint.sm || $vuetify.breakpoint.md
        ? 'mini'
        : 'normal'
    }`"
  >
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>
        <nuxt-link to="/">
          <img style="height: 68px" src="~/assets/torrunx.png" />
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-list style="padding: 4px; background-color: #272727">
        <v-list-item>
          <v-list-item-action>
            <LOGIN />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-app-bar>
    <v-main>
      <v-progress-linear
        indeterminate
        v-show="apiLoading"
        color="cyan darken-2"
      ></v-progress-linear>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LOGIN from "@/components/Login";
export default {
  components: {
    LOGIN,
  },
  data() {
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
      title: "Torrunx",
    };
  },
  computed: {
    apiLoading() {
      return this.$store.state.apiLoading;
    },
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}
body {
  background-color: black;
}
</style>
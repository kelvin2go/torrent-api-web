<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Webtor
        </v-card-title>
        <v-card-text>
          <p> Webtor is a torrent search for movie and cloud download on self hosting server</p>
          <p>
            <a
              href="./movie"
              target="_blank"
            >
              Start
            </a>
          </p>
          <p>
            This project using <a
              href="https://github.com/JimmyLaurent/torrent-search-api"
              target="_blank"
            >
              Torrent search api
            </a> <a
              href="https://github.com/webtorrent/webtorrent"
              target="_blank"
            >
              Web torrent
            </a>

            API server: strapi <a
              href="https://github.com/webtorrent/webtorrent"
              target="_blank"
            >
              Strapi
            </a>

            Web view <a
              href="https://github.com/kelvin2go/torrent-api-web"
              target="_blank"
            >
              NuxtJS + vuejs
            </a>

          </p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>

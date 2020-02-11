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
          <br />
          <p>
            This project is based on: <br />
            <a
              href="https://github.com/JimmyLaurent/torrent-search-api"
              target="_blank"
            >
              Torrent search api
            </a> <br />
            <a
              href="https://github.com/webtorrent/webtorrent"
              target="_blank"
            >
              Web torrent
            </a><br /><br />

            API server: Strapi <a
              href="https://github.com/webtorrent/webtorrent"
              target="_blank"
            >
              Strapi
            </a>
            <br />
            Web view: <a
              href="https://github.com/kelvin2go/torrent-api-web"
              target="_blank"
            >
              NuxtJS + vuejs
            </a>

          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/movie"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  components: {
  }
}
</script>

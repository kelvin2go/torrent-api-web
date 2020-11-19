<template>
  <v-card>
    <v-card-text>
      <p>
        Torrunx web is a torrent search UI for movie and cloud web torrent on
        self-hosting server
      </p>

      <p>
        This project's GitHub Repo:
        <a href="https://github.com/kelvin2go/torrent-api-web" target="_blank"
          >WEB</a
        >
        /
        <a href="https://github.com/kelvin2go/torrent-api-web" target="_blank"
          >API Server</a
        >
      </p>
      <p>
        This project based on: <br />
        Strapi API framwork:
        <a href="https://strapi.io/" target="_blank"> Strapi </a> with
        <a
          href="https://github.com/JimmyLaurent/torrent-search-api"
          target="_blank"
        >
          Torrent search api
        </a>
        /
        <a href="https://github.com/webtorrent/webtorrent" target="_blank">
          Web torrent
        </a>
        <br />
        Web framework:
        <a href="https://nuxtjs.org/" target="_blank"> NuxtJS </a>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" nuxt to="/movie"> Continue </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
  name: "intro",
};
</script>
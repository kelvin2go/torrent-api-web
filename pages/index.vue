<template>
  <div>
    <v-layout column justify-center align-center>
      <v-flex xs12>
        <v-container fluid>
          <h2>Lastest search</h2>
          <v-row align="center" justify="center" dense>
            <v-chip
              class="ma-2 text-uppercase"
              v-for="(word, index) in lastestSearch"
              :key="`search-${index}`"
              @click="$router.push(`/movie/search/${word}`)"
            >
              {{ word }}
            </v-chip>
          </v-row>
          <h2>Popular Movies</h2>
          <v-row align="center" justify="center" dense>
            <v-col
              v-for="(movie, index) in popMovies"
              :key="`movie-${movie.id}`"
              align-self="center"
            >
              <nuxt-link :to="`/movie/search/${movie.title}`">
                <MovieCardTMDBmini
                  v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
                  :options="{ index }"
                  :movie="movie"
                />
                <MovieCardTMDB :options="{ index }" :movie="movie" v-else />
              </nuxt-link>
            </v-col>
          </v-row>
        </v-container>
        <v-card>
          <v-card-text>
            <p>
              Webtor is a torrent search for movie and cloud download on self
              hosting server
            </p>
            <p>
              <a href="./movie"> Start </a>
            </p>
            <br />
            <p>
              This project is based on: <br />
              <a
                href="https://github.com/JimmyLaurent/torrent-search-api"
                target="_blank"
              >
                Torrent search api
              </a>
              <br />
              <a
                href="https://github.com/webtorrent/webtorrent"
                target="_blank"
              >
                Web torrent </a
              ><br /><br />

              API server: Strapi
              <a
                href="https://github.com/webtorrent/webtorrent"
                target="_blank"
              >
                Strapi
              </a>
              <br />
              Web view:
              <a
                href="https://github.com/kelvin2go/torrent-api-web"
                target="_blank"
              >
                NuxtJS + vuejs
              </a>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" nuxt to="/movie"> Continue </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import MovieCardTMDB from "@/components/movie/MovieCardTMDB2020";
import MovieCardTMDBmini from "@/components/movie/MovieCardTMDBmini";

export default {
  auth: false,
  layout: "cover",
  data() {
    return {
      popMovie: null,
      tmdbImageBase: process.env.TMDB_IMG_BASE,
    };
  },
  components: {
    MovieCardTMDB,
    MovieCardTMDBmini,
  },
  mounted() {
    this.getPopMovie();
    this.getLastestMovie();
  },
  computed: {
    popMovies() {
      return this.$store.state.movies.pop;
    },
    lastestSearch() {
      return this.$store.state.movies.latest;
    },
  },
  methods: {
    async getPopMovie() {
      try {
        this.$store.dispatch("movies/getPop");
      } catch (err) {
        console.log(err);
      }
    },
    async getLastestMovie() {
      try {
        this.$store.dispatch("movies/getLatest");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

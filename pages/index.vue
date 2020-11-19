<template>
  <div>
    <v-layout column justify-center align-center>
      <v-flex xs12>
        <v-container fluid>
          <h2>Lastest search</h2>
          <v-row align="center" justify="center" dense
            ><v-col>
              <v-text-field
                v-model="form.keyword"
                label="search movie"
                dense
                solo
                rounded
                append-icon="search"
                @click:append="search"
              ></v-text-field>
            </v-col>
          </v-row>
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
      </v-flex>

      <v-flex>
        <Intro />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import MovieCardTMDB from "@/components/movie/MovieCardTMDB2020";
import MovieCardTMDBmini from "@/components/movie/MovieCardTMDBmini";
import Intro from "@/components/Intro";

export default {
  auth: false,
  layout: "cover",
  components: {
    MovieCardTMDB,
    MovieCardTMDBmini,
    Intro,
  },
  data() {
    return {
      popMovie: null,
      tmdbImageBase: process.env.TMDB_IMG_BASE,
      form: {
        keyword: "",
      },
    };
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
    search() {
      this.$router.push(`movie/search/${this.form.keyword}`);
    },
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

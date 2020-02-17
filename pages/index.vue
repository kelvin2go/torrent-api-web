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
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="movie in popMovie"
            :key="`movie-${movie.id}`"
            :cols="4"
          >
            <nuxt-link :to="`/movie/search/${movie.title}`">
              <MovieCardTMDB :movie="movie" />
            </nuxt-link>

          </v-col>
        </v-row>
      </v-container>
      <v-card>
        <v-card-text>
          <p> Webtor is a torrent search for movie and cloud download on self hosting server</p>
          <p>
            <a href="./movie">
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
import MovieCardTMDB from '@/components/MovieCardTMDB'

const API_URL = process.env.API_URL
export default {
  auth: false,
  data () {
    return {
      popMovie: null,
    }
  },
  components: {
    MovieCardTMDB
  },
  mounted () {
    this.getPopMovie()
  },
  methods: {
    async getPopMovie () {
      this.loading = true
      this.popMovie = null
      try {
        const params = {
          ...this.form,
        }

        const { data } = await this.$axios.get(`${API_URL}/ranked-movies/pop`)
        console.log('popMovie', data)
        if (data) {
          this.popMovie = data.list.map(x => {
            return {
              ...x,
              poster: `${process.env.TMDB_IMG_BASE}${x.poster_path}`,
            }
          })
        }
      }
      catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

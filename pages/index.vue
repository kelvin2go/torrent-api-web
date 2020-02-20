<template>
  <div>

    <v-parallax
      v-if="movieCover && movieCover.cover"
      dark
      style="width: 100%;height: 68vw;"
      :src="`${movieCover.cover.cover}`"
    >
      <v-row
        align="end"
        justify="end"
      >
        <v-col
          class="text-left"
          cols="12"
          style="background-color: hsla(0, 0%, 0%, 0.4);padding-bottom: 100px"
        >
          <nuxt-link
            class="white--text"
            :to="`/movie/search/${movieCover.title}`"
          >
            <h1 class="display-1 font-weight-thin mb-4">{{movieCover.cover.title}} <span
                color="white"
                style="font-size:20px"
              >{{movieCover.cover.release_date}} </span></h1>
            <div class="grey--text ml-4">
              <v-rating
                class="float-left"
                :value="Number(movieCover.cover.vote_average / 2)"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
            </div>

            <div class="white--text lighten-3 ml-4">{{movieCover.cover.vote_average}} ({{movieCover.cover.vote_count}})</div>

            <h4 class="subheading">
              {{movieCover.cover.overview}}
            </h4>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-parallax>
    <v-layout
      column
      justify-center
      align-center
      style="top: 0;position: absolute;margin-top: 58vw;background-color:  hsla(0, 0%, 0%, 0.7);"
    >

      <v-flex xs12>
        <v-container fluid>

          <v-row dense>
            <v-col
              v-for="(movie, index) in movieCover.movies"
              :key="`movie-${movie.id}`"
              :cols="4"
            >
              <nuxt-link :to="`/movie/search/${movie.title}`">
                <MovieCardTMDB
                  :index="index"
                  :movie="movie"
                />
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
  </div>
</template>

<script>
import MovieCardTMDB from '@/components/MovieCardTMDB'

const API_URL = process.env.API_URL
export default {
  auth: false,
  layout: 'cover',
  data () {
    return {
      popMovie: null,
      tmdbImageBase: process.env.TMDB_IMG_BASE,
    }
  },
  components: {
    MovieCardTMDB
  },
  mounted () {
    this.getPopMovie()
  },
  computed: {
    movieCover () {
      if (this.popMovie) {
        return {
          cover: this.popMovie.splice(0, 1)[0],
          movies: this.popMovie
        }
      }
      return {
        cover: null,
        movies: null
      }
    }
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
              cover: `${process.env.TMDB_IMG_BASE}w500${x.poster_path}`,
              poster: `${process.env.TMDB_IMG_BASE}w342${x.poster_path}`,
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

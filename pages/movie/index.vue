<template>
  <v-layout
    column
    justify-sm-end
    align-center
  >
    <v-row no-gutters>
      <v-flex
        xs10
        sm10
        md6
      >
        <v-text-field
          v-model="form.keyword"
          label="search movie"
          dense
          solo
          rounded
          append-icon="search"
          @click:append="search"
        ></v-text-field>

      </v-flex>

      <v-flex xs1>
        <v-select
          v-model="form.per_page"
          :items="per_page"
          :value="form.per_page"
          dense
        ></v-select>
      </v-flex>
      <!-- <v-flex xs2>
        <v-select
          v-model="form.provider"
          :items="providers"
          item-text="name"
          item-value="name"
          :value="providers.length && providers[0].name"
          dense
        ></v-select>
      </v-flex> -->
      <!-- <v-flex xs1>
        <v-btn @click="search">search</v-btn>
      </v-flex> -->
    </v-row>
    <v-row>
      <v-flex
        xs10
        sm10
        md4
        v-if="movieInfo"
      >
        <MovieCard :movie="movieInfo.info" />
      </v-flex>
      <v-flex
        xs10
        sm10
        md8
        v-if="movies"
        style="padding-top:48px !important"
      >

        <v-data-table
          :headers="headers"
          :items="movies"
          hide-default-footer
          :loading="loading"
          class="elevation-1"
          style="min-height:500px"
        >
          <template v-slot:item.status="{item}">
            <div class="floatbox">
              {{item.status }} {{ item.status == 'downloading' ? `${item.percent}%` : '' }}
            </div>
          </template>
          <template v-slot:item.actions="{item}">
            <div class="floatbox">
              <v-btn
                text
                icon
                @click="displayMagnet(item.magnet)"
              >
                <v-icon>museum</v-icon>
              </v-btn>
              <v-btn
                text
                icon
                @click="remoteDownload(item.magnet)"
              >
                <v-icon>cloud</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-flex>
      <v-btn @click="getMessage"> socket</v-btn>
    </v-row>
  </v-layout>
</template>

<script>
import MovieCard from '@/components/MovieCard'
import SocketStatus from 'nuxt-socket-io'
const API_URL = process.env.API_URL

export default {
  components: {
    MovieCard,
    SocketStatus
  },
  name: 'movieIndex',
  props: ['inKeyword'],
  data () {
    return {
      keyword: '',
      providers: [],
      per_page: ['1', '5', '10', '20'],
      form: {
        keyword: '',
        per_page: '5',
      },
      movies: null,
      active: null,
      searchResults: [],
      loading: false,
      movieMP4: null,
      file: null,
      providers: [],
      downloadedFile: {},
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'title',
        },
        {
          text: 'size',
          align: 'left',
          sortable: false,
          value: 'size',
        },
        {
          text: 'Provider',
          align: 'left',
          sortable: false,
          value: 'provider',
        },
        {
          text: 'Time',
          align: 'left',
          sortable: false,
          value: 'time',
        },
        // {
        //   text: 'Magnet',
        //   align: 'left',
        //   sortable: false,
        //   value: 'magnet',
        // },
        {
          text: 'status',
          align: 'left',
          sortable: false,
          value: 'status',
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'actions',
        }
      ],
      movieInfo: null,
      socket1: null,
      socketStatus: {},
      badStatus: {},
      myEmitErrors: null,
    };
  },
  computed: {
    magnet () {
      console.log(this.active, this.movies)
      if (this.active != null && this.movies && this.movies.length) {
        return this.movies[this.active].magnet
      }
      return null
    },
  },
  async mounted () {
    if (this.inKeyword) {
      this.form.keyword = this.inKeyword
      this.search()
    }
    // const { data } = await this.$axios.get(`${API_URL}/torrent/activeProviders`)
    // this.providers = data
    this.socket1 = this.$nuxtSocket({ // In our example above, since vuex opts are set for 'home', they will be used. (see computed props)
      channel: '/hello',
      name: 'connection',
      reconnection: false,
      emitErrorsProp: 'myEmitErrors'
    })
    this.socket1.on('hello', (res) => console.log(res));
  },
  methods: {
    getMessage () {
      console.log('hello')
      this.socket1.emit('movies', { id: 'helloid' }, (resp) => {
        this.messageRxd = resp
      })
        .on('hell', data => console.log(data))
    },
    async remoteDownload (torrentId) {
      this.loading = true
      try {
        const params = {
          torrentId,
        }
        const { data } = await this.$axios.post(`${API_URL}/torrent/download`, { params })

        this.searchResults = data
        if (data && data.torrent_count) {
          this.movies = data.movies
        }
      }
      catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },

    clear () {
      this.movies = []
      this.movieInfo = null
    },
    async search () {
      this.loading = true
      this.movies = []
      this.movieInfo = null
      try {
        const params = {
          ...this.form,
        }

        const movieInfo = await this.$axios.get(`${API_URL}/movie`, { params })
        console.log('movieInfo', movieInfo)
        this.movieInfo = movieInfo.data
        const { data } = await this.$axios.get(`${API_URL}/torrent`, { params })
        console.log(data)

        this.searchResults = data
        if (data && data.torrent_count) {
          this.movies = data.movies
        }
      }
      catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }

  },
}
</script>
<style scoped lang="scss">
.row {
  width: 100%;
}
.floatbox {
  width: 100px;
  .v-btn {
    float: left;
  }
}
</style>
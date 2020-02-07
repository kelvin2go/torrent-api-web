<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-row no-gutters>

      <v-flex
        xs8
        sm8
        md6
      >
        <v-text-field
          v-model="form.keyword"
          label="search movie"
          dense
          solo
          rounded
          prepend-icon="search"
        ></v-text-field>

      </v-flex>
      <v-flex xs1>
        <v-select
          v-model="form.per_page"
          :items="per_page"
          value="1"
        ></v-select>
      </v-flex>

      <v-flex xs1>
        <v-btn @click="search">search</v-btn>
      </v-flex>

    </v-row>
  <v-row v-if="movies">
      <v-flex
        xs3
        v-for="(movie,index) in movies"
        :key="`${index}-movie`"
      >
        <v-card style="width: 500px;">
          <v-card-text>
            <div> {{movie.torrent.provider}}</div>
            <p class="display-1 text--primary">
              {{movie.torrent.title}} | {{movie.torrent.size}}
            </p>
            <p>{{movie.torrent.time}} | seeds:{{movie.torrent.seeds}} peers:{{ movie.torrent.peers}} </p>
            <div class="text--primary">
              {{movie.torrent.desc}}
            </div>
            <div> {{movie.magnet}} </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
              @click="pickMagnet({ index, movie})"
            >
              <v-icon>play_arrow</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-row>
    <v-row>
      <v-flex xs12>
        <v-progress-linear
          indeterminate
          v-show="loading"
        ></v-progress-linear>
        <video
          v-show="magnet"
          width="960"
          height="540"
          controls
          id="player"
        >
        </video>

        <video v-magnet="magnet"></video>
        <div id="test"></div>

        <div id="status">
          <div>
            <span class="show-leech">Downloading </span>
            <span class="show-seed">Seeding </span>
            <code>
              <!-- Informative link to the torrent file -->
              <a
                id="torrentLink"
                href="https://webtorrent.io/torrents/sintel.torrent"
              >sintel.torrent</a>
            </code>
            <span class="show-leech"> from </span>
            <span class="show-seed"> to </span>
            <code id="numPeers">0 peers</code>.
          </div>
          <div>
            <code id="downloaded"></code>
            of <code id="total"></code>
            — <span id="remaining"></span><br />
            &#x2198;<code id="downloadSpeed">0 b/s</code>
            / &#x2197;<code id="uploadSpeed">0 b/s</code>
          </div>

          <h2>Log</h2>
          <div class="log"></div>

        </div>
      </v-flex>
    </v-row>
  </v-layout>
</template>

<script>
import WebTorrent from 'webtorrent-hybrid'
const WT = new WebTorrent()
const API_URL = process.env.API_URL

function onTorrent (torrent) {
  log('Got torrent metadata!')
  log(
    'Torrent info hash: ' + torrent.infoHash + ' ' +
    '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
    '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
  )

  // Print out progress every 5 seconds
  var interval = setInterval(function () {
    log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
  }, 5000)

  torrent.on('done', function () {
    log('Progress: 100%')
    clearInterval(interval)
  })

  // Render all files into to the page
  torrent.files.forEach(function (file) {
    file.appendTo('.log')
    log('(Blob URLs only work if the file is loaded from a server. "http//localhost" works. "file://" does not.)')
    file.getBlobURL(function (err, url) {
      if (err) return log(err.message)
      log('File done.')
      log('<a href="' + url + '">Download full file: ' + file.name + '</a>')
    })
  })
}

function log (str) {
  var p = document.createElement('p')
  p.innerHTML = str
  document.querySelector('.log').appendChild(p)
}
const startDownload = function (torrentId) {
  WT.add(torrentId, onTorrent)
}
const startTorrent = function (torrentId) {
  WT.add(torrentId, function (torrent) {
    // Torrents can contain many files. Let's use the .mp4 file
    console.log(torrent)
    const file = torrent.files.find(function (file) {
      console.log("(*{", file)
      return file.name.endsWith('.mp4')
    })
    setInterval(onProgress, 500)
    function onProgress () {
      // Peers
      $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers')

      // Progress
      var percent = Math.round(torrent.progress * 100 * 100) / 100
      $progressBar.style.width = percent + '%'
      $downloaded.innerHTML = prettyBytes(torrent.downloaded)
      $total.innerHTML = prettyBytes(torrent.length)

      // Remaining time
      var remaining
      if (torrent.done) {
        remaining = 'Done.'
      } else {
        remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
        remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
      }
      $remaining.innerHTML = remaining

      // Speed rates
      $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
      $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'
    }

    file.renderTo('video#player')
    // return file
  })
}
export default {
  components: {
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
        per_page: '1',
      },
      movies: null,
      active: null,
      searchResults: [],
      loading: false,
      movieMP4: null,
      file: null,
      providers: [],
      downloadedFile: {},
      WebTorrent: WT,
      testT: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
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
    }
    const { data } = await this.$axios.get(`${API_URL}/torrent/activeProviders`)
    this.providers = data
  },
  async asyncData ({ params }) {
    const torrentId = decodeURIComponent(params.id)
    console.log(torrentId)

    WT.add(torrentId, onTorrent)
  },
  methods: {
    logic () {
      console.log('hi')
    },
    playSintel () {
      var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
      // var torrentId = 'magnet:?xt=urn:btih:414A6F933C48FC7543A9CDB42C854B5457C5BCC7&dn=Avengers%3A+Endgame+%282019%29+%5BWEBRip%5D+%5B1080p%5D+%5BYTS%5D+%5BYIFY%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce'
      // WT.add(torrentId, function (torrent) {
      //   // Torrents can contain many files. Let's use the .mp4 file
      //   var file = torrent.files.find(function (file) {
      //     return file.name.endsWith('.mp4')
      //   })
      //   // Display the file by adding it to the DOM.
      //   // Supports video, audio, image files, and more!
      //   file.appendTo('#test')
      // })
      WT.add(torrentId, onTorrent)
    },
    async pickMagnet ({ index, movie }) {
      this.active = index
      this.movieMP4 = this.test(movie.magnet)
    },

    async test (torrentId) {
      console.log(torrentId, onTorrent)
      WT.add(torrentId, onTorrent)
    },
    async downloadTorrent (torrentId) {
      // Download the torrent
      console.log(torrentId)
      if (this.downloadedFile.hasOwnProperty(torrentId)) {
        this.downloadedFile[torrentId].file.renderTo('video#player')
      } else {
        console.log('a')
        WT.add(torrentId, function (torrent) {
          // Torrents can contain many files. Let's use the .mp4 file
          console.log('bn', torrent)
          var file = torrent.files.find(function (file) {
            console.log(file.name)
            return file.name.endsWith('.mp4') || file.name.endsWith('.avi') || file.name.endsWith('.mpeg')
          })
          console.log('c', file)
          // Display the file by adding it to the DOM.
          // Supports video, audio, image files, and more!
          file.appendTo('#test')
        })
      }
    },
    async search () {
      this.loading = true
      try {
        const params = {
          ...this.form,
        }
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
<style scoped>
.row {
  width: 100%;
}
</style>
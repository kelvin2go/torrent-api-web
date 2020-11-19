<template>
  <div>
    <v-layout column justify-center align-center>
      <v-flex xs12>
        <v-container fluid>
          <h2>Remote Magnet download</h2>
          <v-card v-show="torrentInfo.percent > 0">
            <v-progress-circular
              :size="100"
              :width="15"
              :value="torrentInfo.percent"
              color="teal"
            >
              {{ torrentInfo.percent }}
            </v-progress-circular>
            {{ torrentInfo.title }}
          </v-card>
          <v-row align="center" justify="center" dense
            ><v-col>
              <v-textarea
                outlined
                name="input-7-1"
                label="Magnet file"
                auto-grow
                v-model="form.torrentId"
                style="min-width: 500px"
              ></v-textarea>
              <v-btn
                :disabled="!form.movieName && !form.torrentId"
                @click="remoteDownload"
              >
                start<v-icon>cloud</v-icon>
              </v-btn>
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
import Intro from "@/components/Intro";
const API_URL = process.env.API_URL;
export default {
  components: {
    Intro,
  },
  data() {
    return {
      lastTorrentId: null,
      timer: null,
      form: {
        torrentId: "",
      },
      torrentInfo: {
        title: "",
        percent: 0,
      },
    };
  },
  mounted() {},
  computed: {},
  methods: {
    async getTorrent() {
      const params = {
        ...this.form,
      };
      const { data } = await this.$axios.get(`${API_URL}/torrent/getInfo`, {
        params,
      });
      console.log(data);
      this.torrentInfo = data;

      if (parseInt(data.percent) >= 100) {
        clearInterval(this.timer);
      }
    },
    backgroundUpdate() {
      if (!this.timer) {
        this.timer = window.setInterval(
          async () => await this.getTorrent(),
          5000
        );
      }
    },
    async remoteDownload() {
      const params = {
        ...this.form,
      };
      try {
        this.lastTorrentId = this.form.torrentId;
        const { data } = await this.$axios.post(
          `${API_URL}/torrent/magDownload`,
          {
            params,
          }
        );

        this.backgroundUpdate();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

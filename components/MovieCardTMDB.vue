
<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
    :style="index < 3 ? `margin-top: 0px !important;` : ''"
  >
    <v-hover v-slot:default="{ hover }">
      <v-img
        height="513"
        :src="movie.poster"
        max-height="513"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            style="margin-top: 54px; background-color:  hsla(0, 0%, 0%, 0.7);"
          >
            <div class="my-4 subtitle-1">
              <v-icon
                small
                flat
                text
              >access_time</v-icon> {{movie.popularity}} • {{movie.release_date}}<br />
            </div>

            <div
              text-truncate
              style="height: 200px;overflow: hidden;"
            > {{movie.overview}}</div>
          </div>
        </v-expand-transition>

      </v-img>
    </v-hover>
    <div class="floatTitle display-1 font-italic font-weight-light">
      <h1> #{{index+2}} </h1>
    </div>
    <v-card-title>
      {{movie.title}} <span
        style="padding-left:20px"
        class="subtitle-1 font-italic font-weight-light"
      > {{movie.release_date}}</span>
    </v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="Number(movie.vote_average / 2)"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">{{movie.vote_average}} ({{movie.vote_count}})</div>
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['movie', 'index'],
  data: () => ({
    hover: false,
  }),

  methods: {

  },
}
</script>

<style lang="scss">
.floatTitle {
  position: absolute;
  // top: -50px;
  top: 0;
  background-color: hsla(0, 0%, 0%, 0.7);
  padding: 7px;
  // margin-top: 513px;
}
</style>
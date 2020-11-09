
<template>
  <v-card class="mx-auto elevation-20" dark style="min-width: 95%">
    <v-row justify="space-between">
      <v-col cols="8">
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ movie.title }}</div>
            <div class="my-4 subtitle-1">
              <v-icon small flat text>access_time</v-icon>
              {{ movie.release_date }}<br />
            </div>
            <div class="overview body-2">{{ movie.overview }}</div>
          </div>
        </v-card-title>
      </v-col>
      <v-img
        contain
        :src="movie.poster"
        max-height="513"
        style="flex-basis: 125px"
      ></v-img>
      <div class="floatTitle subtitle-2 font-italic font-weight-light">
        <h1>{{ options.index + 2 }}</h1>
      </div>
    </v-row>
    <v-divider dark></v-divider>
    <v-card-actions class="pa-4">
      More Info
      <v-spacer></v-spacer>
      <span class="grey--text text--lighten-2 caption mr-2"> </span>
      <v-rating
        :value="Number(movie.vote_average / 2)"
        background-color="white"
        color="yellow accent-4"
        dense
        half-increments
        hover
        size="18"
      ></v-rating>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["movie", "options"],
  data: () => ({
    hover: false,
  }),

  methods: {},
};
</script>

<style lang="scss">
.floatTitle {
  position: absolute;
  // top: -50px;
  top: -7px;
  left: -10px;
  background-color: hsla(0, 0%, 0%, 0.7);
  padding: 7px;
  // margin-top: 513px;
}

.mini {
  .hover-content {
    display: none;
  }
}
.overview {
  max-height: 100px;
  overflow-y: hidden;
}
</style>
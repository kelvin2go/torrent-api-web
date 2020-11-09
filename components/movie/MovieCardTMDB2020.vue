
<template>
  <v-card class="mx-auto movie-card">
    <v-img :src="movie.poster"> </v-img>

    <v-card-title>
      <v-progress-circular
        class="progress font-weight-bold font-italic"
        :value="movie.vote_average * 10"
        :color="colors(movie.vote_average * 10)"
        >{{ movie.vote_average * 10 }}</v-progress-circular
      >

      {{ movie.title }}
    </v-card-title>
    <v-card-text>
      {{ movie.release_date }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["movie", "options"],
  data: () => ({
    hover: false,
  }),

  methods: {
    colors: (value) => {
      return value <= 30 ? "pink" : value < 70 ? "amber" : "green";
    },
  },
};
</script>

<style lang="scss">
.movie-card {
  width: calc(((100vw - 80px) / 4));
  height: calc((((100vw - 100px) / 4)) * 1.5);

  margin-bottom: 130px !important;
}
.progress {
  background-color: black;
  border-radius: 25px;
  position: absolute;
  bottom: -12px;
}
.sbtitle {
  font-size: 15px;
}
</style>

<template>
  <v-card
    class="mx-auto"
    max-width="374"
  >
    <v-img
      height="250"
      :src="movie.poster"
    ></v-img>

    <v-card-title>{{movie.title}}</v-card-title>

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
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  props: ['movie'],
  data: () => ({
  }),
  methods: {
  },
}
</script>
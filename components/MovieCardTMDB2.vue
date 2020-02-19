
<template>
  <v-card
    class="mx-auto elevation-20"
    color="primary"
    dark
    style="max-width: 400px;"
  >
    <v-row justify="space-between">
      <v-col cols="8">
        <v-card-title primary-title>
          <div>
            <div class="headline">{{movie.title}}</div>
            <div>
              <v-icon
                small
                flat
                text
              >access_time</v-icon> {{movie.release_date}}<br />
            </div>
            <div>(2013)</div>
          </div>
        </v-card-title>
      </v-col>
      <v-img
        class="shrink ma-2"
        contain
        height="513px"
        :src="movie.poster"
        style="flex-basis: 513px"
      ></v-img>
    </v-row>
    <v-divider dark></v-divider>
    <v-card-actions class="pa-4">
      More Info
      <v-spacer></v-spacer>
      <span class="grey--text text--lighten-2 caption mr-2">
        {{movie.vote_average}} ({{movie.vote_count}})
      </span>
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
  props: ['movie'],
  data: () => ({

  }),

  methods: {

  },
}
</script>
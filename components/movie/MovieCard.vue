
<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img :src="movie.Poster"></v-img>

    <v-card-title>{{ movie.Title }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="Number(movie.imdbRating / 2)"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          {{ movie.imdbRating }} ({{ movie.imdbVotes }})
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        <v-icon small flat text>access_time</v-icon> {{ movie.Runtime }} •
        {{ movie.Released }}<br />
        <v-icon small flat text>category</v-icon> {{ movie.Rated }} •
        {{ movie.Genre }}<br />
        <v-icon small flat text>category</v-icon> {{ movie.Language }} •
        {{ movie.Country }}<br />
      </div>

      <div>{{ movie.Plot }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <!-- <v-card-title>Tonight's availability</v-card-title> -->

    <!-- <v-card-text> -->
    <!-- <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group> -->
    <!-- </v-card-text> -->

    <!--  <v-card-actions> -->
    <!-- <v-btn
        color="deep-purple accent-4"
        text
      >
      </v-btn> -->
    <!-- </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  props: ["movie"],
  data: () => ({}),

  methods: {},
};
</script>
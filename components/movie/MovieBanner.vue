<template>
  <v-parallax
    v-if="movieCover && movieCover.cover"
    dark
    style="width: 100%; height: 68vw"
    :src="`${movieCover.cover.cover}`"
  >
    <v-row align="end" justify="end">
      <v-col
        class="text-left"
        cols="12"
        style="padding-bottom: 100px; background-color: hsla(0, 0%, 0%, 0.5)"
      >
        <nuxt-link
          class="white--text"
          :to="`/movie/search/${movieCover.cover.title}`"
        >
          <h1 class="display-1 font-weight-thin mb-4">
            {{ movieCover.cover.title }}
            <span color="white" style="font-size: 20px"
              >{{ movieCover.cover.release_date }}
            </span>
          </h1>
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

          <div class="white--text lighten-3 ml-4">
            {{ movieCover.cover.vote_average }} ({{
              movieCover.cover.vote_count
            }})
          </div>

          <h4 class="subheading">
            {{ movieCover.cover.overview }}
          </h4>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-parallax>
</template>
<script>
export default {
  props: ["movieCover"],
  data: () => ({}),
};
</script>
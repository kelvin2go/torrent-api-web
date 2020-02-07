<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <movie :inKeyword="$route.params.keyword"></movie>
  </v-layout>
</template>

<script>
import movie from '@/pages/movie/index'
//$route.query.debug
export default {
  name: 'keyword',
  components: {
    movie,
  },
}
</script>

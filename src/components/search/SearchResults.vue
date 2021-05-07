<template>
  <section>
    <h2>Search Results:</h2>
    <results-paginator
      v-if="results"
      :total-results="totalResults"
      :results-per-page="10"
      :max-pages="100"
      :step-range="5"
    >
      <ul>
        <result-card
          v-for="result in results"
          :key="result.imdbID"
          :title="result.Title"
          :type="result.Type"
          :year="result.Year"
          :imdbID="result.imdbID"
          :poster="result.Poster"
          :nominations="nominations"
        ></result-card>
      </ul>
    </results-paginator>
    <p v-else>No results were found.</p>
  </section>
</template>

<script>
import ResultsPaginator from './ResultsPaginator';
import ResultCard from './ResultCard';

export default {
  components: {
    ResultCard,
    ResultsPaginator,
  },
  computed: {
    results() {
      return this.$store.getters.getResults;
    },
    totalResults() {
      return this.$store.getters.getTotalResults;
    },
    nominations() {
      return this.$store.getters.getNominations;
    },
  },
};
</script>

<style scoped>
</style>
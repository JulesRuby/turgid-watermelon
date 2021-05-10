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
        <!-- v-bind="$attrs from SearchPage to access checkNominations" -->
        <!-- <transition-group tag="ul" mode="out-in" name="make-list"> -->
        <!--Come back and take another swing at getting these list transitions to work. I believe they're being restricted by the conditional rendering of either the paginator, the loader, or maybe the root of this component itself, from the SearchPage.vue  -->
        <result-card
          v-bind="$attrs"
          v-for="result in results"
          :key="result.imdbID"
          :title="result.Title"
          :type="result.Type"
          :year="result.Year"
          :imdbID="result.imdbID"
          :poster="result.Poster"
          :nominations="nominations"
        ></result-card>
        <!-- </transition-group> -->
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
p {
  margin: var(--sp-2) auto;
}
</style>
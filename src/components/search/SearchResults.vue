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
/* .appear-enter-from {
  opacity: 0;
  transform: translateX(3rem);
} */

/* .appear-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.appear-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.appear-leave-to {
  opacity: 0;
  transform: translateX(-3rem);
}

.appear-enter-active {
  transition: all 500ms ease-in;
}

.appear-leave-active {
  transition: all 500ms ease-out;
}

.make-list-enter-from {
  opacity: 0;
  transform: translateX(3rem);
}

.make-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.make-list-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.make-list-leave-to {
  opacity: 0;
  transform: translateX(-3rem);
}

.make-list-enter-active {
  transition: all 500ms ease-in;
}

.make-list-leave-active {
  position: absolute;
  transition: all 500ms ease-out;
}

.make-list-move {
  transition: transform 200ms ease;
} */
</style>
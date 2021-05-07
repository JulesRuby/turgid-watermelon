<template>
  <section>
    <base-card>
      <movie-search
        @emit-search="submitSearch"
        @emit-key="submitKey"
      ></movie-search>
    </base-card>
    <!-- cat is the loader, for meow... -->
    <!-- replace with a loader component/animation -->
    <img v-if="isLoading" src="../assets/cat-loader.jpg" alt="caaaaaat" />
    <search-results v-if="hasSearched && !isLoading"></search-results>
  </section>
</template>

<script>
import MovieSearch from '@/components/search/MovieSearch';
import SearchResults from '@/components/search/SearchResults';

export default {
  name: 'SearchPage',
  components: {
    MovieSearch,
    SearchResults,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    hasSearched() {
      return this.$store.getters.getHasSearched;
    },
  },
  methods: {
    submitKey(apiKey) {
      this.$store.dispatch('apiKey', apiKey);
    },
    async submitSearch(formData) {
      this.isLoading = true;

      this.$store.dispatch('searchParams', {
        title: '',
        year: null,
        page: 1,
      });
      await this.$store.dispatch('fetchMovies', formData);

      this.isLoading = false;
    },
  },
};
</script>

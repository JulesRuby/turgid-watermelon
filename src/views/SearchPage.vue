<template>
  <section>
    <!-- <base-modal :show="maxNominations" title="Nominations Full"> -->
    <base-modal :show="maxAlert" title="Nominations Full" @close="handleAlert">
      <template #default>
        <p>
          You have reached 5 nominations! You can choose review your list,
          submit your list, or continue browsing.
        </p>
      </template>
      <template #actions>
        <base-button @click="handleAlert">Submit</base-button>
        <base-button @click="handleAlert" link to="/nominations"
          >Review</base-button
        >
        <base-button @click="handleAlert">Browse</base-button>
      </template>
    </base-modal>
    <base-card>
      <movie-search
        @emit-search="submitSearch"
        @emit-key="submitKey"
      ></movie-search>
    </base-card>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <search-results
      v-if="hasSearched && !isLoading"
      @check="checkNominations"
    ></search-results>
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
      maxAlert: false,
    };
  },
  computed: {
    hasSearched() {
      return this.$store.getters.getHasSearched;
    },
    sumNominations() {
      return this.$store.getters.getSumNominations;
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
    checkNominations() {
      if (this.sumNominations === 5) {
        this.maxAlert = true;
      }
    },
    handleAlert() {
      this.maxAlert = false;
    },
  },
};
</script>

<style scoped>
section {
  width: 100%;
}
</style>

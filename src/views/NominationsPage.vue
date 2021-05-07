<template>
  <section>
    <h2>Your Nominations</h2>
    <ul v-if="nominations.length > 0">
      <!-- should be noted here, that the properties do not begin with a capital letter, like the implementation od this result-card in SearchResults. This is because the API provides Capitalized properties, while I choose to use lowercase -->
      <result-card
        v-for="nominee in nominations"
        :key="nominee.imdbID"
        :title="nominee.title"
        :type="nominee.type"
        :year="nominee.year"
        :imdbID="nominee.imdbID"
        :poster="nominee.poster"
        :nominations="nominations"
      ></result-card>
    </ul>
    <p v-else>You have no nominations, currently. Search for movies <router-link to="/search">here</router-link>, if you would like to add some. :)</p>
  </section>
</template>

<script>
import ResultCard from '@/components/search/ResultCard';

export default {
  name: 'NominationsPage',
  components: {
    ResultCard,
  },
  data() {
    return {};
  },
  computed: {
    nominations() {
      return this.$store.getters.getNominations;
    },
  },
};
</script>

<style scoped>
</style>
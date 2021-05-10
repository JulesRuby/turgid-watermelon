<template>
  <section>
    <h2>Your Nominations</h2>
    <h3 :class="{ highlight: nominationsFull }">
      {{ nominations.length }} / 5
    </h3>
    <base-button v-if="nominationsFull">Submit Nominations!</base-button>
    <!-- <ul v-if="nominations.length > 0"> -->
    <!-- should be noted here, that the properties do not begin with a capital letter, like the implementation od this result-card in SearchResults. This is because the API provides Capitalized properties, while I choose to use lowercase -->
    <transition-group
      v-if="nominations.length > 0"
      name="movie-list"
      tag="ul"
    >
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
    </transition-group>

    <!-- </ul> -->
    <p v-else>
      You have no nominations, currently. Search for movies
      <router-link to="/search">here</router-link>, if you would like to add
      some. :)
    </p>
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
    nominationsFull() {
      return this.nominations.length === 5;
    },
  },
};
</script>

<style scoped>
p {
  margin-top: var(--sp-2);
}

.highlight {
  color: var(--tertiary);
}

.movie-list-enter-to,
.movie-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.movie-list-enter-active {
  transition: all 200ms ease-in;
}

.movie-list-leave-active {
  position: absolute;
  transition: all 200ms ease-out;
}

.movie-list-enter-from {
  opacity: 0;
  transform: translateX(3rem);
}

.movie-list-leave-to {
  opacity: 0;
  transform: translateX(-3rem);
}

.movie-list-move {
  transition: transform 200ms ease;
}
</style>
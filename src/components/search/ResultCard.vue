<template>
  <base-card>
    <li>
      <h3>{{ title }}</h3>
      <p><span class="bold">Type: </span>{{ type }}</p>
      <p><span class="bold">Year: </span>{{ year }}</p>
      <p><span class="bold">Movie ID: </span>{{ imdbID }}</p>
      <img
        v-if="posterSrc"
        class="poster"
        :src="posterSrc ? poster : null"
        :alt="altText"
        height="100"
        width="75"
      />
      <img
        v-else
        class="poster"
        src="../../assets/poster-na.svg"
        alt="Movie poster image unavailable."
        height="100"
        width="75"
      />
      <base-button class="result-options" link :to="detailRoute"
        >More Info</base-button
      >
      <base-button
        class="result-options"
        :class="isNominated ? 'withdraw' : null"
        @click="handleNominate(isNominated)"
        :disabled="!isNominated && nominations.length >= 5"
        >{{ nominatedCaption }}</base-button
      >
    </li>
  </base-card>
</template>

<script>
export default {
  name: 'ResultCard',
  props: ['title', 'year', 'type', 'imdbID', 'poster', 'nominations'],
  computed: {
    altText() {
      return `Preview ${this.type} poster for: "${this.title}", released ${this.year}`;
    },
    posterSrc() {
      return this.poster !== 'N/A' ? true : false;
    },
    detailRoute() {
      return `/movie/${this.imdbID}`;
    },
    isNominated() {
      return this.nominations.some((nominee) => nominee.imdbID === this.imdbID); // check to see if any nominations match this movie's id
    },
    nominatedCaption() {
      return this.isNominated ? 'Withdraw' : 'Nominate';
    },
  },
  methods: {
    handleNominate(isNominated) {
      console.log(isNominated);

      const payload = {
        isNominated,
        imdbID: this.imdbID,
        title: this.title,
        year: this.year,
        type: this.type,
        poster: this.poster,
      };

      this.$store.dispatch('handleNomination', payload);
    },
  },
};
</script>

<style scoped>
li {
  display: grid;
  grid: repeat(4, 3rem) / 2fr 5fr 2fr;
  column-gap: 1rem;
  grid-auto-flow: column;

  text-align: left;
  place-items: center left;
}

.poster {
  grid-area: 1/1/-1/2;
  place-self: center;
}

h3,
p {
  grid-column: 2/3;
  grid-row: span 1;
}

.result-options {
  grid-column: 3/4;
  grid-row: span 2;
  place-self: start center;
}

.withdraw {
  color: var(--secondary);
  background-color: var(--tertiary);
}

.result-options:last-of-type {
  align-self: end;
}

.result-options:disabled {
  border-color: gray;
  background-color: gray;
  cursor: default;
}
</style>
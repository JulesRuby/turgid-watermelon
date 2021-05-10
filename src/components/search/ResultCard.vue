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
        width="425"
        height="300"
      />
      <img
        v-else
        class="poster"
        src="../../assets/poster-na.svg"
        alt="Movie poster image unavailable."
        width="75"
        height="100"
      />
      <base-button class="result-options" link :to="detailRoute"
        >More Info</base-button
      >
      <base-button
        class="result-options"
        :class="isNominated ? 'withdraw' : ''"
        :mode="isNominated ? 'outline' : 'null'"
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
  props: [
    'title',
    'year',
    'type',
    'imdbID',
    'poster',
    'nominations',
    'onCheck',
  ],
  //prop onCheck from $attrs
  emits: ['check'], // emits check for SearchPage
  // inheritAttrs: false,
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
      // console.log(isNominated);

      const payload = {
        isNominated,
        imdbID: this.imdbID,
        title: this.title,
        year: this.year,
        type: this.type,
        poster: this.poster,
      };

      this.$store.dispatch('handleNomination', payload);

      this.$emit('check');
    },
  },
};
</script>

<style scoped>
li {
  display: grid;
  grid-template-columns: minmax(4.5rem, 2fr) 5fr 2fr;
  /* grid-template-rows: repeat(4, 3.5rem); */
  column-gap: 1rem;
  row-gap: 0.5rem;
  grid-auto-flow: column dense;

  text-align: left;
  place-items: start left;
}

.poster {
  grid-area: 1/1/-1/2;
  grid-area: span 4/1/2;
  /* grid-area: 1/1/span 4/2; */
  place-self: center;

  width: 100%;
  height: 100%;
  object-fit: cover;
}

h3,
p {
  grid-column: 2/3;
  grid-row: span 1;
}

p {
  align-self: end;
}

.result-options {
  grid-column: 3/4;
  grid-row: span 2;
  /* place-self: start start; */
  align-self: center;
  justify-self: center;

  margin: 0 auto;
  --pad-x: var(--sp-1);
}

/* .withdraw {
  color: var(--secondary);
  background-color: var(--tertiary);
  border-color: var(--tertiary);
} */

.result-options:last-of-type {
  align-self: end;
}

.result-options:disabled {
  opacity: 0.5;
  color: var(--primary);
  background-color: var(--secondary);
  border-color: var(--secondary);
  cursor: default;
}
</style>
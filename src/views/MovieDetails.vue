<template>
  <section>
    <router-link to="/search">Return to search page</router-link>
    <base-card>
      <h1>Movie details</h1>
      <article v-if="!isLoading">
        <header>
          <h2>{{ movie.Title }}</h2>
          <!-- <base-button>Nominate</base-button> -->
          <ul class="row">
            <li>{{ movie.Released }}</li>
            <li>{{ movie.Runtime }}</li>
            <li>Rated {{ movie.Rated }}</li>
          </ul>
        </header>

        <div class="grid">
          <img
            v-if="poster"
            :src="movie.Poster ? movie.Poster : null"
            :alt="altText"
            width="300"
            height="425"
          />

          <img
            v-else
            src="../assets/poster-na.svg"
            alt="Movie poster image unavailable."
            height="100"
            width="75"
          />

          <ul class="column ratings">
            <li v-for="(rating, index) in movie.Ratings" :key="index">
              <span class="bold">{{ rating.Source }}</span>
              <span>{{ rating.Value }}</span>
            </li>
            <li class="column">
              <span class="bold">Metascore</span>
              <span>{{ movie.Metascore }}</span>
            </li>
          </ul>
        </div>

        <div>
          <base-badge
            v-for="(genre, index) in genreArray"
            :key="index"
            class="badge"
            >{{ genre }}</base-badge
          >
        </div>

        <p>{{ movie.Plot }}</p>

        <details>
          <summary><strong>Top Credits</strong></summary>
          <ul class="details-ul">
            <li><span class="bold">Director:</span> {{ movie.Director }}</li>
            <li><span class="bold">Writers:</span> {{ movie.Writer }}</li>
            <li><span class="bold">Stars:</span> {{ movie.Actors }}</li>
          </ul>
        </details>

        <details>
          <summary><strong>Additional Information:</strong></summary>
          <ul class="details-ul">
            <li><span class="bold">Awards:</span> {{ movie.Awards }}</li>
            <li>
              <span class="bold">Production:</span> {{ movie.Production }}
            </li>
            <li><span class="bold">Box Office:</span> {{ movie.BoxOffice }}</li>
            <li><span class="bold">Country:</span> {{ movie.Country }}</li>
            <li><span class="bold">DVD Release:</span> {{ movie.DVD }}</li>
            <li>
              <span class="bold">Website:</span>
              <a v-if="movie.Website !== 'N/A'" :href="movie.Website">{{
                movie.Website
              }}</a>
              <span v-else> No website listed.</span>
            </li>
          </ul>
        </details>
      </article>
      <div v-else>
        <base-spinner></base-spinner>
      </div>
    </base-card>
    <router-link to="/search">Return to search page</router-link>
  </section>
</template>

<script>
export default {
  name: 'MovieDetails',
  props: ['id'],
  data() {
    return {
      isLoading: false,
      movie: null,
    };
  },
  computed: {
    altText() {
      return `Preview ${this.movie.Type} poster for: "${this.movie.Title}", released ${this.movie.Year}`;
    },
    genreArray() {
      return this.movie.Genre.split(', ');
    },
    poster() {
      return this.movie.Poster !== 'N/A' ? true : false;
    },
    home() {
      return this.$router;
    },
  },
  created() {
    this.fetchDetailed();
  },
  methods: {
    async fetchDetailed() {
      this.isLoading = true;

      const apiKey = this.$store.getters.getApiKey;
      const baseUrl = this.$store.getters.getBaseUrl;
      const fetchUrl = `${baseUrl}${apiKey}&i=${this.id}&plot=full`;

      const response = await fetch(fetchUrl);
      const responseData = await response.json();

      this.movie = responseData;
      this.replaceDelimiter(this.movie.Actors, ',', ' //');
      this.isLoading = false;
    },
    replaceDelimiter(string, target, replacement) {
      const exp = new RegExp(target, 'g');
      const newThang = string.replace(exp, replacement);

      this.movie.Actors = newThang;
    },

    handleNominate(isNominated) {
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
.card {
  padding: var(--sp-1);
}

h1 {
  padding: var(--sp-1) 0;
}

header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  margin-top: calc(var(--sp-3) * -1);
  /* align-items: center; */

  padding: var(--sp-2) 0;
}

header > * {
  margin-top: var(--sp-3);
}

header ul {
  margin-top: var(--sp-3);
  flex-grow: 1;
  width: 100%;
}

article {
  /* will use with border-<side> for a visual divider */
  --divider: 2px solid var(--divi-color, var(--primary20));

  text-align: left;

  border-top: var(--divider);
}

article > * + * {
  margin-top: var(--sp-3);
}

.badge {
  margin-right: var(--sp-1);

  background-color: var(--tertiary);
  border-radius: var(--b-radius5);
}

.bold p {
  display: inline-block;
  font-weight: normal;
}

.row {
  display: flex;
  justify-content: stretch;
  justify-items: stretch;
}

.row > li {
  flex-grow: 1;
}

.column {
  display: flex;
  flex-direction: column;
}

.grid {
  display: grid;
  grid-template-columns: minmax(100px, 300px) 1fr;
  grid-gap: var(--gap, 1rem);
}

img {
  max-width: 100%;
  height: auto;
}

.ratings > * + * {
  padding-top: var(--sp-1);
  border-top: var(--divider);
}

.ratings li {
  padding-left: var(--sp-1);
  padding-bottom: var(--sp-1);
}

.ratings span {
  display: table; /* using table on spans for easy linebreaks without block width */
}

.ratings > *:last-child {
  flex-grow: 1;

  justify-content: center;
  padding: var(--sp-1);

  text-align: center;
  font-size: var(--h6);
}

summary {
  color: var(--secondary5);

  cursor: pointer;
}

details[open] summary {
  padding-bottom: var(--sp-3);
  color: var(--tertiary20);
}

details li {
  padding: var(--sp-3) 0;
  border-top: var(--divider);
}
</style>
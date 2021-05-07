<template>
  <h2>Movie details</h2>
  <base-card>
    <article v-if="!isLoading">
      <h2>{{ movie.Title }}</h2>
      <ul>
        <li>{{ movie.Released }}</li>
        <li>{{ movie.Runtime }}</li>
        <li>{{ movie.Rated }}</li>
      </ul>
      <img
        v-if="movie.Poster"
        class="poster"
        :src="movie.Poster ? movie.Poster : null"
        :alt="altText"
        height="250"
        width="175"
      />
      <img
        v-else
        class="poster"
        src="../assets/poster-na.svg"
        alt="Movie poster image unavailable."
        height="100"
        width="75"
      />
      <ul>
        <li v-for="(rating, index) in movie.Ratings" :key="index">
          {{ rating.Source }} - {{ rating.Value }}
        </li>
        <li>{{ movie.Metascore }}</li>
      </ul>
      <span v-for="(genre, index) in genreArray" :key="index" class="badge">{{
        genre
      }}</span>
      <p>{{ movie.Plot }}</p>
      <details open>
        <summary><strong>Top Credits</strong></summary>
        <ul>
          <li><span class="bold">Director:</span> {{ movie.Director }}</li>
          <li><span class="bold">Writers:</span> {{ movie.Writer }}</li>
          <li><span class="bold">Stars:</span> {{ movie.Actors }}</li>
        </ul>
      </details>
      <details open>
        <summary><strong>Additional Information:</strong></summary>
        <ul>
          <li><span class="bold">Awards:</span> {{ movie.Awards }}</li>
          <li><span class="bold">Production:</span> {{ movie.Production }}</li>
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
    <img
      v-else
      src="../assets/cat-loader.jpg"
      alt="hydration, babyyyyyyy"
      height="300"
      width="300"
    />
  </base-card>
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
  },
};
</script>

<style scoped>
article {
  text-align: left;
}

.badge {
  display: inline-block;
  margin: 0.5rem auto 0.5rem 0.25rem;
  padding: 0.25rem 0.5rem;

  background-color: var(--tertiary);

  border-radius: var(--b-radius5);
}

.bold p {
  display: inline-block;
  font-weight: normal;
}
</style>
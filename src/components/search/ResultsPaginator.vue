<template>
  <div>
    <p>Displaying page: {{ currentPage }} of {{ storeCappedPages }}</p>
    <ul>
      <li>
        <button
          class="stepper"
          @click="stepPage('previous')"
          :disabled="currentParams.page === 1"
        >
          Previous
        </button>
      </li>
      <li v-for="step in storeStepper" :key="step">
        <button
          class="pager"
          :class="{ 'active-page': currentPage === step }"
          @click="stepPage(null, step)"
          :disabled="currentPage === step"
        >
          {{ step }}
        </button>
      </li>

      <li>
        <button
          class="stepper"
          @click="stepPage('next', null)"
          :disabled="currentParams.page === storePossiblePages"
        >
          Next
        </button>
      </li>
    </ul>
    <!-- async the slotted data -->
    <slot v-if="!isLoading"></slot>
    <!-- cat is the loader, for meow... -->
    <!-- replace with a loader component/animation -->
    <img v-else src="../../assets/cat-loader.jpg" alt="caaaaaat" />
    <ul>
      <li>
        <button
          class="stepper"
          @click="stepPage('previous')"
          :disabled="currentParams.page === 1"
        >
          Previous
        </button>
      </li>
      <li v-for="step in storeStepper" :key="step">
        <button
          class="pager"
          :class="{ 'active-page': currentPage === step }"
          @click="stepPage(null, step)"
        >
          {{ step }}
        </button>
      </li>

      <li>
        <button
          class="stepper"
          @click="stepPage('next', null)"
          :disabled="currentParams.page === storePossiblePages"
        >
          Next
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ResultsPaginator',
  props: ['totalResults', 'maxPages', 'resultsPerPage', 'stepRange'],
  data() {
    return {
      isLoading: false,
      pages: null,
    };
  },
  computed: {
    // Probably going to leverage mapping getters for this, once I'm more certain I'm happy with these
    // Perhaps I should move some of these to a higher level
    checkState() {
      return this.$store.getters.getState;
    },
    currentParams() {
      return this.$store.getters.getSearchParams;
    },
    currentPage() {
      return this.currentParams.page;
    },
    storeMaxPages() {
      return this.$store.getters.getMaxPages;
    },
    storeResultsPerPage() {
      return this.$store.getters.getResultsPerPage;
    },
    storeStepAllowance() {
      return this.$store.getters.getStepAllowance;
    },
    storeStepper() {
      return this.$store.getters.getStepperArray;
    },
    storePossiblePages() {
      return this.$store.getters.getPossiblePages;
    },
    storeCappedPages() {
      return this.$store.getters.getCappedPages;
    },
  },
  mounted() {
    this.setLimits();
    this.$store.dispatch('stepper');
  },
  methods: {
    async stepPage(direction, page) {
      this.isLoading = true;
      // spread stored parameters
      let payload = {
        ...this.currentParams,
      };

      if (direction && direction === 'next') {
        payload.page++; // increment the payload page
      } else {
        payload.page--; // decrement the payload page
      }

      if (page) {
        payload.page = page;
      }

      await this.$store.dispatch('fetchMovies', payload);

      this.isLoading = false;
    },

    setLimits() {
      const payload = {
        maxPages: this.maxPages,
        resultsPerPage: this.resultsPerPage,
        stepAllowance: this.stepRange,
      };

      this.$store.dispatch('pageLimits', payload);
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  justify-content: center;
  align-items: center;
}

.stepper {
  padding: 0.5rem 1rem;

  width: 12ch;

  color: white;
  background-color: indigo;

  border: 0;
  border-radius: 5px;

  cursor: pointer;
}

.stepper:disabled {
  opacity: 0.6;
  color: black;
  background-color: gray;
  cursor: default;
}

li {
  margin: 0 1rem;
  /* margin-right: 1rem; */
}

li:last-child {
  margin-right: 0;
}

.pager {
  width: 1.5rem;
  height: 1.5rem;

  font-size: 0.75rem;

  background-color: darksalmon;

  border: 0;
  border-radius: 50%;

  transition: transform 200ms ease-in-out;
  cursor: pointer;
}

.active-page {
  background-color: cyan;
  transform: scale(1.4);
  cursor: default;
}
</style>
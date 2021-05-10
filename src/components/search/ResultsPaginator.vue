<template>
  <div>
    <p>Displaying page: {{ currentPage }} of {{ storeCappedPages }}</p>
    <base-card>
      <ul>
        <li>
          <button
            class="stepper"
            @click="stepPage('previous', null, $event)"
            :disabled="currentParams.page === 1"
          >
            <!-- Previous -->
          </button>
        </li>
        <li v-for="step in storeStepper" :key="step">
          <button
            class="pager"
            :class="{ 'active-page': currentPage === step }"
            @click="stepPage(null, step, $event)"
            :disabled="currentPage === step"
          >
            {{ step }}
          </button>
        </li>

        <li>
          <button
            class="stepper"
            @click="stepPage('next', null, $event)"
            :disabled="currentParams.page === storePossiblePages"
          >
            <!-- Next -->
          </button>
        </li>
      </ul>
    </base-card>

    <!-- async the slotted data -->
    <slot v-if="!isLoading"></slot>

    <div v-else>
      <base-spinner></base-spinner>
    </div>

    <base-card>
      <ul>
        <li>
          <button
            class="stepper"
            @click="stepPage('previous', null, $event)"
            :disabled="currentParams.page === 1"
          >
            <!-- Previous -->
          </button>
        </li>
        <li v-for="step in storeStepper" :key="step">
          <button
            class="pager"
            :class="{ 'active-page': currentPage === step }"
            @click="stepPage(null, step, $event)"
          >
            {{ step }}
          </button>
        </li>

        <li>
          <button
            class="stepper"
            @click="stepPage('next', null, $event)"
            :disabled="currentParams.page === storePossiblePages"
          >
            <!-- Next -->
          </button>
        </li>
      </ul>
    </base-card>
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
    this.setLimits(); // set the stepper limits in Vuex
    this.$store.dispatch('stepper');
  },
  methods: {
    async stepPage(direction, page, event) {
      event.target.blur(); // blur the stepper to return it's styling
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
p {
  margin: var(--sp-1) auto;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 1rem;
  /* margin-right: 1rem; */
  width: 1.5rem;
  height: 1.5rem;
}

ul li:first-child {
  margin-left: 0;
  width: 1.25rem;
  height: 2.25rem;
  clip-path: polygon(100% 0, 100% 100%, 0 50%);
}

ul li:last-child {
  margin-right: 0;
  width: 1.25rem;
  height: 2.25rem;
  clip-path: polygon(0 0, 0% 100%, 100% 50%);
}

.stepper {
  width: 1.25rem;
  height: 2.25rem;

  background-color: var(--primary20);

  border: 0;
  border-radius: 0;

  cursor: pointer;

  transition: var(--default-trans);
}

.stepper:hover,
.stepper:focus,
.stepper:active {
  background-color: var(--tertiary);
}

.stepper:disabled {
  opacity: 0.6;
  color: black;
  background-color: gray;
  cursor: default;
}

.pager {
  width: 1.25rem;
  height: 1.25rem;

  font-size: 0.75rem;
  color: var(--primary);

  background-color: var(--secondary10);

  border: 0;
  border-radius: 50%;

  transition: var(--default-trans);
  cursor: pointer;
}

.pager:hover,
.pager:focus,
.pager:active {
  background-color: var(--tertiary20);
}

.active-page {
  color: var(--primary);
  background-color: var(--tertiary);
  transform: scale(1.25);
  cursor: default;
}

.active-page:hover,
.active-page:focus,
.active-page:active {
  background-color: var(--tertiary);
  background-color: var(--tertiary);
}
</style>
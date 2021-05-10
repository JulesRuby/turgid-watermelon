export default {
  apiKey(context, payload) {
    context.commit('setApiKey', payload);
  },

  searchParams(context, payload) {
    context.commit('setSearchParams', payload);
  },

  pageLimits(context, payload) {
    context.commit('setMaxPages', payload.maxPages);
    context.commit('setResultsPerPage', payload.resultsPerPage);
    context.commit('setStepAllowance', payload.stepAllowance);
  },

  stepper(context) {
    const stepAllowance = context.getters.getStepAllowance;
    const currentPage = context.getters.getSearchParams.page;
    const cappedPages = context.getters.getCappedPages;

    let stepperArray = [];

    if (cappedPages < stepAllowance) {
      for (let step = 1; step <= cappedPages; step++) {
        stepperArray = [...stepperArray, step];
      }
    } else {
      for (let step = 1; step <= stepAllowance; step++) {
        stepperArray = [...stepperArray, step];
      }
    }

    const medianPosition = Math.floor(stepAllowance / 2);
    const finalPosition = Math.floor(stepperArray.length - 1);

    let medianValue = stepperArray[medianPosition];
    let finalValue = stepperArray[finalPosition];
    let diff = currentPage - medianValue;

    if (currentPage <= medianValue || finalValue >= cappedPages) {
      context.commit('setStepperArray', stepperArray);
      return;
    }

    stepperArray = stepperArray.map(x => x + diff);

    finalValue = stepperArray[finalPosition];

    if (finalValue >= cappedPages) {
      diff = cappedPages - finalValue;
      stepperArray = stepperArray.map(x => x + diff);
    }

    context.commit('setStepperArray', stepperArray);
  },

  async fetchMovies(context, payload) {
    context.commit('setHasSearched');
    const baseUrl = context.getters.getBaseUrl;
    const apiKey = context.getters.getApiKey;
    const { title, year, page } = payload;

    context.dispatch('searchParams', {
      title,
      year,
      page
    });

    // if payload attribute contains a null value, the query negelects the parameters
    // Hard coded in the &type=movie since the assignment specifies movie-only searches
    const response = await fetch(
      `${baseUrl}${apiKey}&s=${title}&y=${year}&type=movie&page=${page}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      return;
    }

    const { totalResults } = responseData;
    const results = responseData.Search;

    // context.commit('setHasSearched');
    context.commit('setResults', {
      results,
      totalResults
    });
    context.dispatch('stepper');
  },

  nominateMovie(context, payload) {
    let nominations = context.getters.getNominations;

    // fallback check, but handled in component... so may not need
    if (nominations.length === 5) {
      alert('Maximum 5 nominations');
      return;
    }

    nominations = [...nominations, payload];
    context.commit('setNominations', nominations);
  },

  withdrawMovie(context, payload) {
    let currNominees = context.getters.getNominations;
    let filteredNominees = currNominees.filter(
      nominee => nominee.imdbID !== payload
    );

    context.commit('setNominations', filteredNominees);
  },

  handleNomination(context, payload) {
    if (!payload.isNominated) {
      delete payload.isNominated; // delete isNominated, it won't be needed when commiting the payload to state
      context.dispatch('nominateMovie', payload);
    } else {
      payload = payload.imdbID; // payload only requires the id to filter
      context.dispatch('withdrawMovie', payload);
    }
  }
};

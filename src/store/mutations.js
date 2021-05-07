export default {
  setApiKey(state, payload) {
    state.apiKey = payload;
  },
  setResults(state, payload) {
    state.results = payload.results;
    state.totalResults = payload.totalResults;
  },
  setNominations(state, payload) {
    state.nominations = payload;
  },
  setSearchParams(state, payload) {
    state.searchParams.title = payload.title;
    state.searchParams.year = payload.year;
    state.searchParams.page = payload.page;
  },
  setHasSearched(state) {
    state.hasSearched = true;
  },
  setMaxPages(state, payload) {
    state.maxPages = payload;
  },
  setResultsPerPage(state, payload) {
    state.resultsPerPage = payload;
  },
  setStepAllowance(state, payload) {
    state.stepAllowance = payload;
  },
  setStepperArray(state, payload) {
    state.stepperArray = payload;
  },
  setMovieDetails(state, payload) {
    state.movieDetails = payload;
  }
  // resetParams(state) {
  // 	state.searchParams.title = '';
  //   state.searchParams.year = null;
  //   state.searchParams.page = 1;
  // }
};

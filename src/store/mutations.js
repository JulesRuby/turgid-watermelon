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
  },
  setClearStore(state, payload) {
   state.apiKey = payload.apiKey;
   state.baseUrl = payload.baseUrl;
   state.hasSearched = payload.hasSearched;
   state.searchParams = payload.searchParams;
   state.results = payload.results;
   state.totalResults = payload.totalResults;
   state.stepperArray = payload.stepperArray;
   state.maxPages = payload.maxPages;
   state.resultsPerPage = payload.resultsPerPage;
   state.movieDetails = payload.movieDetails;
   state.nominations = payload.nominations;
  }
};

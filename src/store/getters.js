export default {
  getState(state) {
    return state;
  },
  getBaseUrl(state) {
    return state.baseUrl;
  },
  getApiKey(state) {
    return state.apiKey;
  },
  getResults(state) {
    return state.results;
  },
  getNominations(state) {
    return state.nominations;
  },
  getTotalResults(state) {
    return state.totalResults;
  },
  getSearchParams(state) {
    return state.searchParams;
  },
  getHasSearched(state) {
    return state.hasSearched;
  },
  getStepperArray(state) {
    return state.stepperArray;
  },
  getMaxPages(state) {
    return state.maxPages;
  },
  getResultsPerPage(state) {
    return state.resultsPerPage;
  },
  getStepAllowance(state) {
    return state.stepAllowance;
  },
  getPossiblePages(_, getters) {
    return Math.ceil(getters.getTotalResults / getters.getResultsPerPage);
  },
  getCappedPages(_, getters) {
    return getters.getPossiblePages > getters.getMaxPages
      ? getters.getMaxPages
      : getters.getPossiblePages;
  },
  getMovieDetails(state) {
    return state.movieDetails;
  }
};

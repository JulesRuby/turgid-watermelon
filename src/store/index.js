import { createStore } from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default createStore({
  state() {
    return {
      apiKey: '',
      baseUrl: 'https://www.omdbapi.com/?apikey=',
      hasSearched: false,
      searchParams: {
        title: '',
        year: null,
        type: 'movie', // Will remain static as assignment specifies
        page: 1
      },
      results: [],
      totalResults: null,
      stepperArray: [],
      maxPages: null,
      resultsPerPage: null,
      movieDetails: {},
      nominations: []
    };
  },
  mutations,
  actions,
  getters
});

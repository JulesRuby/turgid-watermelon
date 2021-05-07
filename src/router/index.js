import { createRouter, createWebHistory } from 'vue-router';

import SearchPage from '../views/SearchPage.vue';
import NominationsPage from '../views/NominationsPage.vue';
import MovieDetails from '../views/MovieDetails.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    redirect: { name: 'SearchPage' }
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    props: true // allow us to pass in the id via params
  },
  {
    path: '/nominations',
    name: 'NominationsPage',
    component: NominationsPage,
  },
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

import { createApp } from 'vue';

import router from './router';
import store from './store';

import App from './App.vue';

import BaseCard from './components/ui/BaseCard';
import BaseButton from './components/ui/BaseButton';
import BaseBadge from './components/ui/BaseBadge';
import BaseSpinner from './components/ui/BaseSpinner';
import BaseModal from './components/ui/BaseModal';

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-modal', BaseModal);
app.component('base-spinner', BaseSpinner);

app.use(store);
app.use(router);

// return a promise when the router is ready, indicating that we should then mount the app. Avoiding transition animation on the initial site load
router.isReady().then(() => {
  app.mount('#app');
});
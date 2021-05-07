<template>
  <app-header></app-header>
  <main>
    <router-view />
  </main>
  <app-footer></app-footer>
</template>

<script>
import AppHeader from './components/nav/AppHeader';
import AppFooter from './components/footer/AppFooter';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style>
/* :root, */
html {
  /* TYPOGRAPHY */
  --base-font-size: 12px;
  --fluid-modifier: 0.7;
  --heading-modifier: 1.1;

  /* Calculate a fluid rem size */
  --fluid-rem: calc(var(--base-font-size) + var(--fluid-modifier) * 1vw);

  /* calculate heading sizes */
  --h6: calc(var(--fluid-rem) * var(--heading-modifier));
  --h5: calc(var(--h6) * var(--heading-modifier));
  --h4: calc(var(--h5) * var(--heading-modifier));
  --h3: calc(var(--h4) * var(--heading-modifier));
  --h2: calc(var(--h3) * var(--heading-modifier));
  --h1: calc(var(--h2) * var(--heading-modifier));

  /* set document font-size to fluid rem, now 1rem scales with viewport */
  font-size: var(--fluid-rem);

  /* a6cfd5 light blue */
  /* daffed 151, 100%, 93% aero blue */
  /* 161925 228, 25%, 12% rich b fogra 29 */
  /* d4d2d5 280, 3%, 83% light gray */
  /* f7f7ff 240, 100%, 98% ghost white */
  /* fffff2 ivory 60, 100%, 97% */
  /* ffa400 39, 100%, 50% orange web */
  /* f6ae2d  honey yellow*/
  /* d16014  tenne twany*/
  /* ff7d00 amber something */
  /* fa9f42 deep saffron */
  /* ef767a 358, 79%, 70% light coral */
  /* f56476 fiery rose */

  /* Colors, I guess */
  --primary: hsla(60, 100%, 97%, 1);
  --secondary: hsla(228, 25%, 12%, 1);
  --tertiary: hsla(39, 100%, 50%, 1);

  /* UI Styles */
  --b-radius5: 5px;

  /* Transitions/Animations */
  --default: all 200ms ease;
}

*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--primary);
}

ul {
  list-style: none;
  padding: 0;
}

h1 {
  font-size: var(--h1);
}

#app {
  overflow: hidden;
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  font-family: 'Roboto Mono', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  padding: 2rem 1rem;
  flex-grow: 1;
}

.bold {
  font-weight: bold;
}
</style>

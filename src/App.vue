<template>
  <app-header></app-header>
  <router-view v-slot="{ Component }">
    <main>
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </main>
  </router-view>
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

  /* ivory */
  --prim-h: 60;
  --prim-s: 100%;
  --prim-l: 97%;
  --prim-a: 1;

  --sec-h: 228;
  --sec-s: 25%;
  --sec-l: 12%;
  --sec-a: 1;

  --tert-h: 39;
  --tert-s: 100%;
  --tert-l: 50%;
  --tert-a: 1;

  --primary: hsla(var(--sec-h), var(--sec-s), var(--sec-l), var(--sec-a));
  --primary5: hsla(
    var(--sec-h),
    var(--sec-s),
    calc(var(--sec-l) + 5%),
    var(--sec-a)
  );
  --primary10: hsla(
    var(--sec-h),
    var(--sec-s),
    calc(var(--sec-l) + 10%),
    var(--sec-a)
  );
  --primary15: hsla(
    var(--sec-h),
    var(--sec-s),
    calc(var(--sec-l) + 15%),
    var(--sec-a)
  );
  --primary20: hsla(
    var(--sec-h),
    var(--sec-s),
    calc(var(--sec-l) + 20%),
    var(--sec-a)
  );

  --secondary: hsla(var(--prim-h), var(--prim-s), var(--prim-l), var(--prim-a));
  --secondary5: hsla(
    var(--prim-h),
    var(--prim-s),
    calc(var(--prim-l) - 5%),
    var(--prim-a)
  );
  --secondary10: hsla(
    var(--prim-h),
    var(--prim-s),
    calc(var(--prim-l) - 10%),
    var(--prim-a)
  );
  --secondary15: hsla(
    var(--prim-h),
    var(--prim-s),
    calc(var(--prim-l) - 15%),
    var(--prim-a)
  );
  --secondary20: hsla(
    var(--prim-h),
    var(--prim-s),
    calc(var(--prim-l) - 20%),
    var(--prim-a)
  );

  --tertiary: hsla(var(--tert-h), var(--tert-s), var(--tert-l), var(--tert-a));
  --tertiary5: hsla(
    var(--tert-h),
    var(--tert-s),
    calc(var(--tert-l) + 5%),
    var(--tert-a)
  );
  --tertiary10: hsla(
    var(--tert-h),
    var(--tert-s),
    calc(var(--tert-l) + 10%),
    var(--tert-a)
  );
  --tertiary15: hsla(
    var(--tert-h),
    var(--tert-s),
    calc(var(--tert-l) + 15%),
    var(--tert-a)
  );
  --tertiary20: hsla(
    var(--tert-h),
    var(--tert-s),
    calc(var(--tert-l) + 20%),
    var(--tert-a)
  );

  /* UI Styles */
  --sm-radius: 2px;
  --m-radius: 5px;

  /* Transitions/Animations */
  --default-trans: all 200ms ease;

  /* Spacing */
  --spacing: 1rem; /* base unit */

  --sp-1: calc(var(--spacing) * 0.5);
  --sp-2: calc(var(--spacing) * 0.75);
  --sp-3: calc(var(--spacing) * 1);
  --sp-4: calc(var(--spacing) * 1.25);
  --sp-5: calc(var(--spacing) * 1.5);
}

*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--primary10);

  color: var(--secondary);
  font-size: var(--fluid-rem);
  font-family: 'Roboto Mono', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  overflow: hidden;
  display: flex;
  flex-direction: column;

  min-height: 100vh;

  text-align: center;
}

h1 {
  font-size: var(--h2);
}

h2 {
  font-size: var(--h4);
}

h3 {
  font-size: var(--h5);
}

ul {
  list-style: none;
  padding: 0;
}

a {
  text-decoration: none;
  color: var(--tertiary);
}

p {
  line-height: 1.5;
  max-width: 60ch;
}

label,
input {
  font-size: 0.9rem;
}

input {
  padding: 1.75rem 0.75rem 0.75rem;

  background-color: var(--primary15);
  border: 5px var(--border-type, solid) var(--primary20);
  border-radius: var(--sm-radius);

  transition: var(--default-trans);
}

/* override browser stylseheets for autocomplete styles */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  border: 0;
  outline: 0;
  -webkit-text-fill-color: var(--tertiary);
  box-shadow: 0 0 0px 1000px var(--primary15) inset;
  -webkit-box-shadow: 0 0 0px 1000px var(--primary15) inset;
  transition: background-color 5000s ease-in-out 0s;
}


main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;
  padding: 2rem 1rem;

  width: 100%;
  max-width: 45rem;
}

.bold {
  font-weight: bold;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.route-enter-active {
  transition: all 200ms ease-in;
}

.route-leave-active {
  position: absolute;
  transition: all 200ms ease-out;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(3rem);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-3rem);
}

.route-move {
  transition: transform 200ms ease;
}
</style>

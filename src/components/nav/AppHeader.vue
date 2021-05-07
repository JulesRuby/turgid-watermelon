<template>
  <header>
    <nav>
      <h1><router-link to="/">omdbAPI</router-link></h1>
      <ul>
        <li><router-link :to="{ name: 'SearchPage' }">Search</router-link></li>
        <li>
          <router-link to="/nominations">Nominations</router-link
          ><base-badge
            v-if="counter !== 0"
            mode="floating"
            :value="counter"
          ></base-badge>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    counter() {
      return this.$store.getters.getNominations.length;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;

  height: 7rem;

  background-color: var(--secondary);
}

nav {
  flex-grow: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
}

nav ul {
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a {
  display: inline-block;
  padding: 0.75rem 1rem;

  color: var(--secondary);
  font-weight: bold;
  text-decoration: none;

  background-color: var(--tertiary);

  border-radius: var(--b-radius5);
}

ul a {
  color: var(--primary);
  background-color: var(--secondary);
  transition: var(--default);
}

ul a:hover,
ul a:active {
  filter: brightness(160%);
}

li {
  position: relative;
  margin-left: 1rem;
}

nav a.router-link-exact-active {
  color: var(--tertiary);
}
</style>
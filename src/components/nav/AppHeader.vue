<template>
  <header>
    <nav>
      <!-- <h1><router-link to="/">omdbAPI</router-link></h1> -->
      <base-button link to="/"><h1>Reely</h1></base-button>
      <ul>
        <!-- <li><router-link :to="{ name: 'SearchPage' }">Search</router-link></li> -->
        <li><base-button link mode="flat" to="/search">Search</base-button></li>
        <!-- <li>
          <router-link to="/nominations">Nominations</router-link
          ><base-badge
            v-if="counter !== 0"
            mode="floating"
            :value="counter"
          ></base-badge>
        </li> -->
        <li>
          <base-button link mode="flat" to="/nominations"
            >Nominations</base-button
          ><base-badge v-if="counter !== 0" mode="floating">{{
            counter
          }}</base-badge>
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

  background-color: var(--primary);
}

nav {
  flex-grow: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* nav a {
  font-weight: bold;
  text-decoration: none;
} */

a {
  /* font-weight: bold; */
  text-decoration: none;
}

ul a {
  margin-right: unset;
  padding: 0.5rem 1rem;
  color: var(--secondary);
  transition: var(--default-trans);
}

li {
  position: relative;
  margin-left: 1rem;
}

nav a.router-link-exact-active {
  color: var(--tertiary);
}
</style>
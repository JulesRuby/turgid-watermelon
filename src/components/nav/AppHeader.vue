<template>
  <header>
    <nav>
      <!-- This stinks, and it take on the active class when used. It's not hugely important at the moment, but I dislike the look of it. I'll revisit it later. -->
      <base-button link to="/"><h1>Reely</h1></base-button>
      <ul>
        <li><base-button link mode="flat" to="/search">Search</base-button></li>
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

a {
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
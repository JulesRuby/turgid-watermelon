<template>
  <footer>A fing I made &copy; 2021</footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {};
  },
};
</script>

<style scoped>
footer {
  display: grid;
  place-items: center;

  padding: 1rem;

  height: 5rem;

  color: var(--secondary);
  background-color: var(--primary);
}
</style>
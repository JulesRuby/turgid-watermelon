<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style scoped>
button,
a {
  display: inline-block;
  margin-right: 0.5rem;
  padding: var(--pad-y, 0.5rem) var(--pad-x, 1.25rem);

  font: inherit;
  text-decoration: none;
  text-align: center;
  color: var(--secondary);

  background-color: var(--primary15);
  border: 3px solid var(--primary15);
  border-radius: var(--m-radius);

  cursor: pointer;

  transition: var(--default-trans);
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: var(--tertiary);
  border-color: var(--tertiary);
  color: var(--primary);
}

.flat {
  background-color: transparent;
  color: var(--secondary);
  border: none;
}

.outline {
  color: var(--secondary);
  background-color: transparent;
  border-color: var(--primary10);
}

.flat:hover,
.flat:active {
  background-color: var(--primary10);
  color: var(--tertiary);
}

.outline:hover,
.outline:active {
  background-color: var(--primary10);
  color: var(--tertiary10);
}
</style>
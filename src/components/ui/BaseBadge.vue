<template>
  <span class="badge" :class="mode">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {},
};
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: var(--sp-1);

  text-align: center;
  color: var(--secondary);

  background-color: var(--primary10);
  border-radius: var(--m-radius);
}

.floating {
  display: grid;
  place-content: center;
  place-items: center;

  position: absolute;

  top: 0;
  left: 0;

  height: 2rem;
  width: 2rem;

  color: var(--primary);
  background-color: var(--tertiary10);

  border-radius: 50%;
  transform: translate(-50%, -50%);

  cursor: pointer;

  z-index: 1;
}
</style>
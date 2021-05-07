<template>
  <span class="badge" :class="mode">
    {{ value }}
  </span>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: ['mode', 'value'],
  computed: {

  },
};
</script>

<style scoped>
.badge {
  display: grid;
  place-content: center;
  place-items: center;

  height: 2rem;
  width: 2rem;

  text-align: center center;
  color: var(--secondary);
  background-color: var(--tertiary);
  border-radius: 50%;
}

.floating {
  position: absolute;

  top: 0;
  left: 0;

	transform: translate(-50%, -50%);

  z-index: 1;
}
</style>
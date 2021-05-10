<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="modal">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot>{{ title }}</slot>
        </section>
        <!-- Messing with menu, because it's 'neat' though not well supported -->
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button @click="tryClose">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.75);
  z-index: 10;
}

dialog {
  overflow: hidden;
  position: fixed;

  padding: 0;
  margin: 0;
  top: 20vh;
  left: 10%;

  width: 80%;

  background-color: var(--primary);

  border-radius: var(--m-radius);
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);

  z-index: 100;
}

header {
  /* background-color: #3a0061; */
  background-color: var(--tertiary);
  color: var(--primary5);
  width: 100%;
  padding: var(--sp-3);
}

header h2 {
  margin: 0;
}

section {
  padding: var(--sp-3);
  color: var(--secondary);
}

menu {
  padding: var(--sp-3);
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translate(0, -3rem) scale(0.8);
}

.modal-enter-active {
  transition: all 200ms ease-in;
}

.modal-leave-active {
  transition: all 200ms ease-out;
}

.modal-leave-from,
.modal-enter-to {
  opacity: 1;
  transform: translate(0, 0) scale(1);
}

@media (min-width: 48em) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
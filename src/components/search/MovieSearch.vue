<template>
  <h2>{{ formTitle }}</h2>
  <p v-if="!hasApiKey">
    If you don't have an API key, you can obtain one easily
    <a href="http://www.omdbapi.com/apikey.aspx">here</a>
  </p>
  <base-modal :show="!!error" title="Input error" @close="confirmError">{{
    error
  }}</base-modal>
  <form @submit.prevent="submitForm">
    <div v-if="!hasApiKey" class="form-control">
      <input type="text" id="apiKey" v-model.trim="apiKey" />
      <label for="apiKey">Your API key:</label>
    </div>
    <div v-if="hasApiKey" class="form-control">
      <input type="text" id="movieTitle" v-model="title" />
      <label for="movieTitle">Movie Title:</label>
    </div>
    <div v-if="hasApiKey" class="form-control checkbox-group">
      <input type="number" id="year" v-model.trim="year" />
      <label for="year">Year:</label>
    </div>
    <base-button>{{ submitCaption }}</base-button>
  </form>
</template>

<script>
export default {
  emits: ['emit-search', 'emit-key'],
  data() {
    return {
      error: null,
      // isValid: true,
      apiKey: '',
      title: '',
      year: null,
      formValid: true,
    };
  },
  computed: {
    hasApiKey() {
      return !!this.$store.getters.getApiKey; // distill getter to Boolean
    },
    submitCaption() {
      return this.hasApiKey ? 'Search' : 'Set API Key';
    },
    formTitle() {
      return this.hasApiKey
        ? 'Enter your search parameters'
        : 'You must set your API key to search';
    },
  },
  methods: {
    submitForm(e, page) {
      const apiKey = this.apiKey;
      let formData = {
        title: this.title,
        year: this.year,
        page: page || 1,
      };

      if (!this.hasApiKey) {
        this.checkApiKey();

        this.$emit('emit-key', apiKey);
      } else {
        this.checkTitle();
        // convert empty strong year to null to avoid borking the searches
        // honestly I'm just going to coerce any sort of ridiculous year query into null, for now
        if (formData.year !== null && formData.year.length !== 4) {
          formData.year = null;
        }
        this.$emit('emit-search', formData);
      }
    },

    checkTitle() {
      this.formValid = true;

      if (this.title === '') {
        this.error = 'You must enter a movie title';
        this.formValid = false;
        return;
      }
    },

    checkApiKey() {
      this.formValid = true;

      if (this.apiKey.length !== 8) {
        this.error = 'Your API key should be 8 characters in length';
        this.formValid = false;
        return;
      }
    },

    confirmError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
h2,
p {
  margin: 0.75rem auto;
}

form {
  margin-top: 3rem;
}

form > * + * {
  margin-top: 1rem;
}

.form-control {
  position: relative;
  display: flex;
  flex-direction: column;

  text-align: left;
}

label {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
}

input {
  --border-type: none;
}

input:active,
input:focus,
input:active + label,
input:focus + label {
  outline: 0;
  color: var(--tertiary);
}

input:active,
input:focus {
  box-shadow: 0 0 6px hsla(var(--sec-h), var(--sec-s), var(--sec-l), 0.2);
  background-color: var(--primary20);
}
</style>
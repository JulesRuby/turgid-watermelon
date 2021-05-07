<template>
  <h2>{{ formTitle }}</h2>
  <p v-if="!hasApiKey">
    If you don't have an API key, you can obtain one easily
    <a href="http://www.omdbapi.com/apikey.aspx">here</a>
  </p>
  <form @submit.prevent="submitForm">
    <div v-if="!hasApiKey" class="form-control">
      <input type="text" id="apiKey" v-model.trim="apiKey" />
      <label for="apiKey">Your API key:</label>
    </div>
    <div v-if="hasApiKey" class="form-control">
      <!-- <input type="text" id="movieTitle" v-model="movieTitle" /> -->
      <input type="text" id="movieTitle" v-model="title" />
      <label for="movieTitle">Movie Title:</label>
    </div>
    <div v-if="hasApiKey" class="form-control checkbox-group">
      <input type="number" id="year" v-model.trim="year" min="1900" />
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
      isValid: true,
      apiKey: '',
      // movieTitle: '',
      title: '',
      year: null,
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
        // movieTitle: this.movieTitle,
        title: this.title,
        year: this.year,
        page: page || 1,
      };

      if (!this.hasApiKey) {
        this.$emit('emit-key', apiKey);
      } else {
        // convert empty strong year to null to avoid borking the searches
        // y=& will not work, though y=null& will
        if (formData.year === '') {
          formData.year = null;
        }
        this.$emit('emit-search', formData);
      }
    },
  },
};
</script>

<style scoped>
h2,
p {
  margin: 0.75rem 0;
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

label:focus {
  color: green;
}

input {
  padding: 1.75rem 0.75rem 0.75rem;
  border: 2px inset gray;
  border-radius: 5px;
}

input:focus,
input:active {
  outline: 0;
}

input:active,
input:focus {
  border-color: green;
}

input:active + label,
input:focus + label {
  color: green;
}
</style>
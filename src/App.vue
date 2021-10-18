<template>
  <main class="box wrapper flex column gap-1">
    <picture>
      <source media="(min-width:1100px)" :srcset="apod.hdurl" />
      <img :src="apod.url" alt="APOD" />
    </picture>
    <div class="flex between align-center wide">
      <h3>{{ apod.title }}</h3>
    </div>
    <div class="flex wide gap-1">
      <button @click="toggleExplenation">Explanation</button>
      <button @click="toggleCopyright">Copyright</button>
      <input
        type="date"
        name="date"
        id="apodDate"
        class="auto-left"
        v-model="apod.date"
        @change="newDate($event)"
      />
    </div>
    <p v-show="showExplenation">{{ apod.explanation }}</p>
    <p v-show="showCopyright">Copyright: {{ apod.copyright }}</p>
  </main>
</template>

<script>
import axios from "axios";
let NASAurl = "https://api.nasa.gov/planetary/apod";
let NASAkey = "?api_key=omoaeca7rC6uT4dse25qNh65bUFRJDAIsBUAgVN4";

export default {
  name: "App",
  data() {
    return {
      apod: {
        date: null,
      },
      showExplenation: false,
      showCopyright: false,
    };
  },
  methods: {
    toggleExplenation() {
      this.showExplenation = !this.showExplenation;
    },
    toggleCopyright() {
      this.showCopyright = !this.showCopyright;
    },
    newDate(e) {
      let newDate = "&date=" + e.target.value;
      e.target.classList.add("loading");
      axios
        .get(NASAurl + NASAkey + newDate)
        .then((response) => (this.apod = response.data));
      e.target.classList.remove("loading");
    },
  },
  created() {
    axios.get(NASAurl + NASAkey).then((response) => {
      this.apod = response.data;
    });
  },
};
</script>

<style lang="scss"></style>

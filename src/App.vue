<template>
  <main class="box wrapper flex column gap-1">
    <iframe
      height="100%"
      :src="apod.url"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="video"
      v-if="videoUrl"
    ></iframe>
    <img :src="apod.url" alt="APOD" v-else />
    <div class="flex between align-center wide">
      <h1>{{ apod.title }}</h1>
    </div>
    <div class="flex wide gap-1 btn-container">
      <button @click="toggleExplenation">Explanation</button>
      <button @click="toggleCopyright">Copyright</button>
      <a :href="apod.hdurl" target="_blank" rel="noopener noreferrer" class="btn external-link">Full Resolution</a>
      <input
        type="date"
        name="date"
        class="auto-left"
        :value="apod.date"
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
let url = null;

export default {
  name: "App",
  data() {
    return {
      apod: {
        date: null,
        url: "",
        hdurl: "",
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
  computed: {
    videoUrl() {
      url = this.apod.url;

      if (url.includes("youtube") || url.includes("vimeo")) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.video {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.btn.external-link::after {
  vertical-align: top;
}

@media screen and (max-width: 400px) {
  .btn-container {
    overflow-x: scroll;
  }
}
</style>

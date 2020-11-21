<template>
  <div class="AllAds">
    <h1>Zde jsou všechny inzeráty</h1>

    <ul id="adds">
      <li v-for="ad in ads" :key="ad.id">
        <img :src="ad.picture" />
        <h2>{{ ad.name }}</h2>
        <p>{{ ad.type }}</p>
        <p>{{ ad.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      ads: [],
    };
  },
  methods: {
    fetchAds() {
      fetch("http://127.0.0.1:5000/ads")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error("Něco je špatně");
          }
        })
        .then((json) => {
          this.ads = json;
        })
        .catch((error) => {
          this.ads = error;
        });
    },
  },
  created() {
    console.log("created");
    this.fetchAds();
  },
};
</script>

<style></style>

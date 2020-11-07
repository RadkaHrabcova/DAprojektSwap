<template>
  <div class="AllAds">
    <p>Zde jsou všechny inzeráty</p>
    
   <ul id="adds">
  <li v-for="ad in ads" :key="ad.id">
    {{ ad.author }} - {{ad.name}} - {{ad.content}}
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
          // ze serveru přišla odpověď
          if (response.ok) {
            // vše je ok, stáhneme zbytek zprávy jako JSON
            return response.json();
          } else {
            // dostali jsme odpověď, ale na serveru došlo k chybě
            throw Error("Něco je špatně");
          }
        })
        .then((json) => {
          // vypsání výsledku
          this.ads = json;
        })
        .catch((error) => {
          // vypsání chyby
          this.ads = error;
        });
    },
  },
  created(){
      console.log('created')
    this.fetchAds()
  }
};
</script>

<style></style>

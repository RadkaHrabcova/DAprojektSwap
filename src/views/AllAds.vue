<template>
  <div class="AllAds">
    <h2>Výpis inzerátů</h2>

    <v-row justify="center">
      <v-col v-for="ad in ads" :key="ad.id" cols="12" sm="8">
        <v-card class="mx-auto ad-border" max-width="344">
          <v-img
            :src="ad.picture"
            max-height="180px"
            contain
            class="img-margin"
          ></v-img>

          <v-card-title>
            {{ ad.name }}
          </v-card-title>

          <v-card-subtitle>
            {{ ad.type }}
          </v-card-subtitle>

          <v-btn color="green darken-2" text @click="show = !show">
            Detail inzerátu
          </v-btn>

          <v-card-text v-show="show">
            {{ ad.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ads: [],
      show: false,
    };
  },
  methods: {
    fetchAds() {
      fetch("https://beta-swapito-main-sv1kp3pz6lex.herokuapp.com/ads")
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

<style scoped>
.ad-border {
  border: 1px solid lightgrey;
  border-radius: 10px;
}

.img-margin {
  margin-top: 10px;
}</style
>>

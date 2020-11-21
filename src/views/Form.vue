<template>
  <form @submit.prevent="sendData" class="ad">
    <h2>Přidej inzerát</h2>

  <v-stepper
    v-model="e6"
    vertical
  >
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
    >
      Nahraj foto nebo obrázek
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card
        height="150px">
        <v-card-text>
          <v-file-input
            v-model="picture"
            counter
            label="Foto"
            multiple
            prepend-icon="mdi-paperclip"
            placeholder="Vyberte ze složky"
            outlined
            :show-size="1000"
            @change="previewImage" 
            accept="image/*" 
                >
            <template v-slot:selection="{ index, text }">
              <v-chip
                v-if="index < 2"
                color="light-green darken-1"
                dark
                label
                small
                    >
                {{ text }}
              </v-chip>

              <span
                v-else-if="index === 2"
                class="overline grey--text text--darken-3 mx-2"
              >
                +{{ picture.length - 2 }} File(s)
              </span>
            </template>
          </v-file-input>

        <!--     <div>
              <p>
                {{ uploadValue.toFixed() + "%" }}
                <progress id="progress" :value="uploadValue" max="100"></progress>
              </p>
            </div>
            <div v-if="imageData != null">
              <img class="preview" :src="picture" />
              <br />
              <button @click="onUpload">Upload</button>
            </div> -->
        </v-card-text>
      </v-card>

      <v-btn
        color="primary"
        @click="e6 = 2"
      >
        Pokračovat
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
    >
      Doplň další informace
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card>
        <v-card-text>
      <v-container fluid>
        <v-radio-group
          v-model="type"
          row
          mandatory
        >
          <v-radio
            label="Nabízím"
            value="offer"
          ></v-radio>
          <v-radio
            label="Poptávám"
            value="request"
          ></v-radio>
        </v-radio-group>
      </v-container>
        <v-select
          v-model="category"
          :items="categories"
          label="Zvolte kategorii"
          multiple
          chips
          outlined
        ></v-select>

        <v-text-field
          v-model="name"
          label="Název produktu"
          outlined
          clearable
        ></v-text-field>

        <v-textarea
          v-model="description"
          label="Popis produktu"
          counter
          maxlength="120"
          full-width
          outlined
          hint="Zde zadejte, co hledáte nebo nabízíte"
        ></v-textarea>

        <v-text-field
          v-model="location"
          label="Lokalita"
          outlined
          clearable
        ></v-text-field>

        </v-card-text>
      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 3"
      >
        Pokračovat
      </v-btn>
      <v-btn 
      @click="e6--"
      text>
        Zpět
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
    >
      Co za to?
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card>
        <v-card-text>  
          <v-text-field
            v-model="exchange"
            label="Výměním za.."
            outlined
            clearable
          ></v-text-field>
        </v-card-text>
      </v-card>

      <v-btn
        color="primary"
        @click="e6 = 4"
      >
        Continue
      </v-btn>
      <v-btn
      @click="e6--"
       text>
        Zpět
      </v-btn>
    </v-stepper-content>
  </v-stepper>
    <v-btn
      outlined
      color="#7CB342"
    >Přidat inzerát</v-btn>
  </form>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      type: "",
      category: [],
      categories:["Květiny", "Hračky", "Oblečení", "Domácnost"],
      name: "",
      description: "",
      location: "",
      exchange: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      e6: 1
    };
  },
  methods: {
    sendData() {
      console.log("posilam data");
      fetch("http://127.0.0.1:5000/ad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: this.type,
          category: this.category,
          name: this.name,
          description: this.description,
          exchange: this.exchange,
          imageData: this.imageData,
          picture: this.picture,
          uploadValue: this.uploadValue,
          product_id: this.product_id,
        }),
      });
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
          });
        }
      );
    },
  },
};
</script>

<style>
img.preview {
  width: 200px;
}

.ad{
  margin: 10px;
}
</style>

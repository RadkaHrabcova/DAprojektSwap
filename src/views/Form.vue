<template>
  <v-form @submit.prevent="sendData" class="ad">
    <h2>Přidej inzerát</h2>

    <v-stepper v-model="stepCount" vertical>
      <v-stepper-step :complete="stepCount > 1" step="1">
        Nahraj foto nebo obrázek
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card>
          <v-card-text>
            <v-file-input
              v-model="picture"
              counter
              label="Foto"
              multiple
              prepend-icon="mdi-paperclip"
              placeholder="Vyberte ze složky"
              outlined
              @change="previewImage"
              :show-size="1000"
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
                  +{{ imageData.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>

            <div v-if="imageData != null">
              <img class="preview" :src="picture" />
              <v-btn class="preview-btn" @click="onUpload">Zobrazit náhled</v-btn>
            </div>
          </v-card-text>
        </v-card>

        <v-btn color="primary" @click="uploadAndContinue">
          Pokračovat
        </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="stepCount > 2" step="2">
        Doplň další informace
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card>
          <v-card-text>
            <v-container fluid>
              <v-radio-group v-model="type" row mandatory>
                <v-radio label="Nabízím" value="Nabízím"></v-radio>
                <v-radio label="Poptávám" value="Poptávám"></v-radio>
              </v-radio-group>
            </v-container>
            <v-select
              v-model="category"
              :items="categories"
              label="Zvolte kategorii"
              multiple
              chips
              outlined
              :error-messages="categoryErrors"
              @input="$v.category.$touch()"
              @blur="$v.category.$touch()"
            ></v-select>

            <v-text-field
              v-model="name"
              label="Název produktu"
              outlined
              clearable
              :error-messages="nameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
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
        <v-btn color="primary" @click="continueStep">
          Pokračovat
        </v-btn>
        <v-btn @click="stepCount--" text>
          Zpět
        </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="stepCount > 3" step="3">
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

        <v-btn @click="stepCount--" text>
          Zpět
        </v-btn>
      </v-stepper-content>
    </v-stepper>

    <v-btn outlined type="submit" color="#7CB342" @click="clearForm">Přidat inzerát</v-btn>
    <div class="success" v-if="savingSuccessful">
      <v-alert
       dismissible
       type="success">
        Váš inzerát byl úspěšně přidán.
      </v-alert>
    </div>
    <div class="error" v-if="pictureNotUploaded">
      <v-alert 
      dismissible
      type="error">
      Nahrajte prosím obrázek nebo pořiďte foto.
      </v-alert>
    </div>
    <div class="error" v-if="submitStatus === 'ERROR'">
      <v-alert 
      dismissible
      type="error">
      Vyplňte prosím všechna povinná pole.
      </v-alert>
    </div>
  </v-form>
</template>

<script>
import firebase from "firebase";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      type: "",
      category: [],
      categories: [
        "Květiny",
        "Hračky",
        "Oblečení",
        "Domácnost",
        "Elektronika",
        "Jiné",
      ],
      name: "",
      description: "",
      location: "",
      exchange: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      stepCount: 1,
      savingSuccessful: false,
      submitStatus: 'OK',
      pictureNotUploaded: false
    };
  },

  mixins: [validationMixin],

  validations: {
    category: { required },
    name: { required },
    
  },

  computed: {
    categoryErrors() {
      const errors = [];
      if (!this.$v.category.$dirty) return errors;
      !this.$v.category.required &&
        errors.push("Kategorie inzerátu musí být zadán.");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Název inzerátu musí být zadán.");
      return errors;
    },

    
  },

  methods: {
    validationCheck(){
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      }
    },

    continueStep(){
      this.submitStatus = 'OK';
      this.validationCheck();
      if(this.submitStatus == 'OK'){
        this.stepCount = 3
      }
    },
    
    sendData() {
      fetch("https://beta-swapito-main-sv1kp3pz6lex.herokuapp.com/ad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: this.type,
          category: this.category,
          name: this.name,
          description: this.description,
          location: this.location,
          exchange: this.exchange,
          picture: this.picture,
          uploadValue: this.uploadValue,
          imageData: this.imageData,
          userID: firebase.auth().currentUser.uid,
        }),
      }),
        (this.savingSuccessful = true);
    },

    previewImage(files) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = files[0];
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

    uploadAndContinue() {
      if(this.imageData == null){
        this.pictureNotUploaded = true;
      }
      this.onUpload();
      this.stepCount = 2;
    },

    clearForm(){
      this.$v.$reset()
      this.type = ""
      this.category = []
      this.name = ""
      this.description = ""
      this.location = ""
      this.exchange = ""
      this.imageData = null
      this.picture = null
      this.uploadValue = 0
      this.stepCount = 1
      this.savingSuccessful = false
    },
  },
};
</script>

<style>
img.preview {
  width: 200px;
}

.ad {
  margin: 10px;
  display: flex;
  flex-direction: column;
}

.v-stepper {
  margin-bottom: 10px;
}

.v-stepper__content {
  padding-top: 5px !important;
}

.v-input--selection-controls {
  margin-top: 0 !important;
}

.container {
  padding-top: 0 !important;
}

.preview-btn{
  margin-left: 10px;
}

.success{
  z-index: 2;
  position: absolute;
  width: 96vw;
}

.error{
  z-index: 2;
  position: absolute;
  width: 96vw;
}
</style>

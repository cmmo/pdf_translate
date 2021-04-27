<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="6">
        <v-file-input
          show-size
          v-model="file"
          label="Select Pdf File..."
        ></v-file-input>
        <v-btn color="primary" @click="onUpload">Upload</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { storage } from "./firebase/db";

export default {
  name: "HelloWorld",

  data: () => ({
    file: null,
    text: null,
    imageUrl: null,
  }),

  methods: {
    onUploadBak() {
      console.log(this.file);
      // Credit: https://stackoverflow.com/a/754398/52160
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (evt) => {
        this.text = evt.target.result;
        console.log(this.text);
      };
      reader.onerror = (evt) => {
        console.error(evt);
      };
    },

    async onUpload() {
      const storageRef = storage.ref(`beforeTranslate.pdf`);
      console.log(storageRef);
      await storageRef.put(this.file).then(() => {
        console.log("Uploaded file!");
      });

      storage
        .ref("afterTranslate.txt")
        .getDownloadURL()
        .then((url) => {
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true; 
          xhr.responseType = "text";
          xhr.onload = () => {
            var text = xhr.response;
            console.log(text);
          };
          xhr.open("GET", url);
          xhr.send();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

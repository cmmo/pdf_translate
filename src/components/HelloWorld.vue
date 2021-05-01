<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="6">
        Powered by Google: Cloud Platform App Engine Cloud function Translation
        API Cloud Storage API Source Repository Cloud Build
      </v-col>
    </v-row>
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
    <v-row class="text-center">
      <v-col class="mb-5" cols="6">
        <v-textarea
          name="Translated Result"
          filled
          label="Translat to Japanese"
          auto-grow
          v-model="text"
        ></v-textarea>
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
    text: "Please wait a few seconds",
    imageUrl: null,
  }),

  methods: {
    async onUpload() {
      const storageRef = storage.ref(`beforeTranslate.pdf`);
      console.log(storageRef);
      await storageRef.put(this.file).then(() => {
        console.log("File Uploaded!");
      });

      //check time
      let timestamp = Math.round(+new Date() / 1000);
      console.log(timestamp);

      let file_updatetime = timestamp - 1; // initial with past time

      while (file_updatetime < timestamp) {
        if (file_updatetime < timestamp) {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1秒待つ
          console.log("Wait 1 second");
        } else {
          await storage
            .ref("afterTranslate.txt")
            .getMetadata()
            .then((metadata) => {
              let date = new Date(metadata.updated);
              file_updatetime = Math.round(date.getTime() / 1000);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }

      console.log("New file translated");
      //check time end

      storage
        .ref("afterTranslate.txt")
        .getDownloadURL()
        .then((url) => {
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.responseType = "text";
          xhr.onload = () => {
            let translatedText = xhr.response;
            console.log(translatedText);
            this.text = translatedText;
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

<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="6">
        Powered by Google: Cloud Platform, App Engine, Cloud function,
        Translation API, Cloud Storage API, Source Repository, Cloud Build
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
        <v-alert type="info" v-if="file == null">Please select a file</v-alert>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="mb-5" cols="6">
        <v-textarea
          name="Translated Result"
          filled
          label="Translate to Japanese"
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
    text: null,
    imageUrl: null,
  }),

  methods: {
    async onUpload() {
      if (this.file == null) {
        return;
      }

      this.text = "Start working, Please wait a few minutes";
      const storageRef = storage.ref(`beforeTranslate.pdf`);
      console.log(storageRef);

      // await storageRef.put(this.file).then(() => {
      //   console.log("File Uploaded!");
      // });

      var uploadTask = storageRef.put(this.file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused": // or 'paused'
              console.log("Upload is paused");
              break;
            case "running": // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        }
      );

      //check time
      let timestamp = Math.round(+new Date() / 1000);
      console.log("timestamp=", timestamp);

      let fileCreatedTime = timestamp - 1; // initial with past time

      while (fileCreatedTime < timestamp) {
        await storage
          .ref("afterTranslate.txt")
          .getMetadata()
          .then((metadata) => {
            let date = new Date(metadata.timeCreated);
            fileCreatedTime = Math.round(date.getTime() / 1000);
            // console.log("fileCreatedTime=", fileCreatedTime);
          })
          .catch((error) => {
            console.log(error);
          });

        if (fileCreatedTime < timestamp) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          console.log("Wait 5 second, fileCreatedTime=%d", fileCreatedTime);
        }
      }

      console.log("New file translated");
      //check time end

      // await new Promise((resolve) => setTimeout(resolve, 5000));
      // console.log("Wait 5 second, fileCreatedTime=%d", fileCreatedTime);

      await storage
        .ref("afterTranslate.txt")
        .getDownloadURL()
        .then((url) => {
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.responseType = "text";
          xhr.open("GET", url);
          xhr.onload = () => {
            let translatedText = xhr.response;
            console.log(translatedText);
            this.text = translatedText;
          };
          xhr.send();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

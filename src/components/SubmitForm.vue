<template>
  <div class="submit-form">
    <q-card class="q-ma-md" flat bordered>
      <q-card-section>
        <div class="text-h6">Teile deine Antworten</div>
        <div class="q-my-md">
          Schreibe deine Name und drucke auf die Taste "Abschicken" um zu teilen
          was du geschrieben hast. Auf die Weise kannst du dabei sein 100€ zu
          gewinnen.
        </div>
        <q-form @submit.prevent="sendData">
          <q-input
            filled
            v-model="userName"
            name="name"
            label="Deine Name"
            required
          />
          <q-btn
            label="Abschicken"
            type="submit"
            color="primary"
            class="q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { LocalStorage } from "quasar";

export default {
  data() {
    return {
      userName: "",
    };
  },
  methods: {
    prepareDataForEmail() {
      let data = {};
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          data[key] = localStorage.getItem(key);
        }
      }
      return data;
    },
    sendData() {
      const formData = new FormData();
      formData.append("name", this.userName);
      formData.append("responses", JSON.stringify(this.prepareDataForEmail()));

      fetch("https://formsubmit.co/martijn.olthuis2@gmail.com", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log(LocalStorage.getAll());
          if (response.ok) {
            // Success notification
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Erfolgreich Abgeschickt!",
            });
          } else {
            // Error notification
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "error",
              message: "Failed to send responses. Please try again.",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "error",
            message: "An error occurred while sending responses.",
          });
        });
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 600px;
  margin: auto;
}
</style>

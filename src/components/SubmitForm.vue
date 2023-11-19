<template>
  <div class="submit-form">
    <q-card class="q-ma-md" flat bordered>
      <q-card-section>
        <div class="text-h6">Teile deine Antworten</div>
        <div class="q-my-md">
          Schreibe deine Name und drucke auf die Taste "Abschicken" um zu teilen
          das du dabei warst. Auf die Weise bekommst du ein Los um 100€ zu
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

          <input type="hidden" name="_captcha" value="false" />
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
import { submitForm } from "src/utils/formSubmitter";

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

      submitForm(formData);
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

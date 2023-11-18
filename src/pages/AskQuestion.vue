<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 600px">
      <h4>Stelle eine anonyme Frage</h4>
      <q-form class="q-gutter-md" @submit.prevent="sendData">
        <q-input
          filled
          v-model="question"
          label="Deine Frage"
          type="textarea"
          hint="Schreibe hier deine Frage"
          name="question"
        />
        <input type="hidden" name="_captcha" value="false" />
        <q-btn label="Absenden" type="submit" color="primary" />
      </q-form>
    </div>
  </q-page>
</template>
<script>
import { submitForm } from "src/utils/formSubmitter";

export default {
  data() {
    return {
      question: "",
    };
  },
  methods: {
    sendData() {
      const formData = new FormData();
      formData.append("question", this.question);

      submitForm(formData);
    },
  },
};
</script>

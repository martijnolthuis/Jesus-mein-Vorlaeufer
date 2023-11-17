<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 600px">
      <h4>Stelle eine anonyme Frage</h4>
      <!-- Smaller title -->
      <q-form class="q-gutter-md" @submit.prevent="submitForm">
        <q-input
          filled
          v-model="question"
          label="Deine Frage"
          type="textarea"
          hint="Schreibe hier deine Frage"
          :rules="[
            (val) =>
              (val && val.length > 10) ||
              'Bitte mindestens 10 Zeichen eingeben',
          ]"
        />
        <q-btn label="Absenden" type="submit" color="primary" />
      </q-form>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      question: "",
    };
  },
  methods: {
    submitForm() {
      const formData = new FormData();
      formData.append("question", this.question);

      fetch("https://formsubmit.co/martijn.olthuis2@gmail.com", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            this.$q.notify({
              type: "positive",
              message: "Question submitted successfully!",
            });
            this.question = "";
          } else {
            this.$q.notify({
              type: "negative",
              message: "Submission failed. Please try again.",
            });
          }
        })
        .catch(() => {
          this.$q.notify({
            type: "negative",
            message: "Submission failed. Please try again.",
          });
        });
    },
  },
};
</script>

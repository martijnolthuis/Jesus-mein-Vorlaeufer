<template>
  <q-page>
    <div class="q-pa-md max-width-container">
      <q-btn
        label="Frage stellen"
        to="/ask-question"
        color="primary"
        icon="question_answer"
        class="flex justify-center q-mb-md"
      />
      <OnTrack ref="onTrackComponent" />
      <IntroductionContent /> <br />
      <ArticleContent @localStorageUpdated="onLocalStorageUpdated" /> <br />
      <BookContent bookFile="/books/Ein so großes Heil.txt" /> <br />
      <BookContent bookFile="/books/Christus offenbart im Fleisch.txt" /> <br />
      <BookContent bookFile="/books/Å være kristen.txt" />
    </div>
  </q-page>
</template>

<script>
import BookContent from "src/components/BookContent.vue";
import ArticleContent from "src/components/ArticleContent.vue";
import { defineComponent } from "vue";
import IntroductionContent from "src/components/IntroductionContent.vue";
import OnTrack from "src/components/OnTrack.vue";

export default defineComponent({
  name: "IndexPage",
  components: { BookContent, ArticleContent, IntroductionContent, OnTrack },
  methods: {
    onLocalStorageUpdated() {
      this.$refs.onTrackComponent.updateStatus(); // Directly call method of OnTrack
    },
  },
});
</script>
<style>
.max-width-container {
  max-width: 800px; /* or any other max-width you prefer */
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px; /* Adjust padding as needed */
  padding-right: 16px; /* Adjust padding as needed */
}
</style>

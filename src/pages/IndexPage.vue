<template>
  <q-page>
    <div class="q-pa-md">
      <IntroductionContent /> <br />
      <ArticleContent /> <br />
      <BookContent bookFile="/books/Ein so großes Heil.txt" /> <br />
      <BookContent bookFile="/books/Christus offenbart im Fleisch.txt" />
    </div>
  </q-page>
</template>

<script>
import BookContent from "src/components/BookContent.vue";
import ArticleContent from "src/components/ArticleContent.vue";
import { defineComponent } from "vue";
import IntroductionContent from "src/components/IntroductionContent.vue";

export default defineComponent({
  name: "IndexPage",
  components: { BookContent, ArticleContent, IntroductionContent },
});
</script>

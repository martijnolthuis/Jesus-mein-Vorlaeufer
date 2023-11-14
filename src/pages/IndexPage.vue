<template>
  <q-page>
    <div class="q-pa-md">
      <BookESGH />
      <br />
      <ArticleContent />
    </div>
  </q-page>
</template>

<script>
import BookESGH from "src/components/BookESGH.vue";
import ArticleContent from "src/components/ArticleContent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: { BookESGH, ArticleContent },
});
</script>

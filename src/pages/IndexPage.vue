<template>
  <q-page>
    <div class="q-pa-md">
      <BookESGH />
      <br />
      <WeekPlan />
    </div>
  </q-page>
</template>

<script>
import BookESGH from "src/components/BookESGH.vue";
import WeekPlan from "src/components/WeekPlan.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: { BookESGH, WeekPlan },
});
</script>

<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item icon="home" label="Einleitung">
      <q-card>
        <q-card-section>
          <div v-html="formattedIntroduction"></div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
export default {
  name: "IntroductionContent",
  data() {
    return {
      formattedIntroduction: "Loading ...",
    };
  },
  mounted() {
    this.loadIntroduction();
  },
  methods: {
    loadIntroduction() {
      fetch("/articles/Einleitung.txt")
        .then((response) => response.text())
        .then((text) => {
          this.formattedIntroduction = text.replace(/\n/g, "</p><p>").trim();
          this.formattedIntroduction = `<p>${this.formattedIntroduction}</p>`;
        });
    },
  },
};
</script>

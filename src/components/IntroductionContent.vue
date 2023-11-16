<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item icon="home" label="Einleitung">
      <q-card>
        <q-card-section> {{ introduction || "Loading ..." }} </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
export default {
  name: "IntroductionContent",
  mounted() {
    this.loadIntroduction();
  },
  methods: {
    loadIntroduction() {
      fetch("/articles/Einleitung.txt")
        .then((response) => response.text())
        .then((text) => {
          this.introduction = text;
        });
    },
  },
};
</script>

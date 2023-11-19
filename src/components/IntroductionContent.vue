<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item icon="home" label="Einleitung" v-model="isOpen">
      <q-card>
        <q-card-section v-if="isOpen">
          <audio
            controls
            src="/articles/audio/Einleitung.mp3"
            type="audio/mpeg"
          >
            Your browser does not support the audio element.
          </audio>
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
      isOpen: false,
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

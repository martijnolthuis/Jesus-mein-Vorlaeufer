<template>
  <q-list bordered class="rounded-borders">
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="primary" @click="setCurrentDay"> Beitrag von Heute </q-btn>
    </div>
    <q-expansion-item
      v-model="jmf"
      icon="list"
      label="Vorbereitung Jugendweihnachtsfeier"
      caption="Artikel & Musik & Reden"
    >
      <q-expansion-item
        v-for="(article, index) in articles"
        :key="article.title"
        v-model="currentDay[article.date]"
        icon="view_day"
        group="somegroup"
        :header-inset-level="0"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-chip size="md" color="primary" text-color="white">
              {{ index + 1 }}
            </q-chip>
          </q-item-section>
          <q-item-section>
            <div class="text-weight-bolder">{{ article.title }}</div>
            <div>{{ article.date }}</div>
          </q-item-section>
          <!-- <q-item-section side>
            <div class="row items-center">Elias Aslaksen</div>
          </q-item-section> -->
        </template>
        <q-card>
          <q-card-section>
            <audio
              @error="() => (article.hasAudio = false)"
              v-if="article.hasAudio"
              controls
              :src="article.audio"
            >
              Your browser does not support the audio element.
            </audio>
            <div v-html="article.content"></div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-expansion-item>
  </q-list>
</template>

<script>
export default {
  name: "ArticleContent",
  data() {
    return {
      currentDay: {},
      jmf: false,
      articles: [], // Array to store the articles
    };
  },
  mounted() {
    this.loadArticles();
  },
  methods: {
    formatDate(date) {
      // Format the date as "Montag 21. November"
      const dayOfWeek = date.toLocaleString("de-DE", { weekday: "long" });
      const day = date.getDate();
      const month = date.toLocaleString("de-DE", { month: "long" });
      return `${dayOfWeek} ${day}. ${month}`;
    },

    loadArticles() {
      fetch("/articles/articles.json")
        .then((response) => response.json())
        .then((filenames) => {
          filenames.forEach((filename) => {
            fetch(`/articles/${filename}.txt`)
              .then((response) => response.text())
              .then((text) => {
                const lines = text.split("\n");
                const title = lines[0];
                const content = this.formatContent(lines.slice(1));
                const audio = `/audio/${filename}.mp3`; // Path to the audio file
                this.articles.push({
                  title,
                  content,
                  audio,
                  hasAudio: true,
                  date: filename,
                });
              })
              .catch((error) => console.error("Error loading article:", error));
          });
        })
        .catch((error) => console.error("Error loading articles list:", error));
    },

    formatContent(lines) {
      // Separate paragraphs with empty lines
      return lines
        .map((line) => (line.trim() === "" ? "<p></p>" : `<p>${line}</p>`))
        .join("");
    },
    today() {
      let todayDate = new Date();
      const dayOfWeek = todayDate.getDay();

      // If today is Saturday (6) or Sunday (0), adjust to the previous Friday
      if (dayOfWeek === 0) {
        // Sunday
        todayDate.setDate(todayDate.getDate() - 2); // Go back to Friday
      } else if (dayOfWeek === 6) {
        // Saturday
        todayDate.setDate(todayDate.getDate() - 1); // Go back to Friday
      }

      return this.formatDate(todayDate);
    },

    setCurrentDay() {
      const todayFormatted = this.today();
      const todayArticle = this.articles.find(
        (article) => article.date === todayFormatted
      );

      if (todayArticle) {
        this.currentDay[todayArticle.date] = true;
        this.jmf = true; // Ensure the expansion item for today's article is opened
      } else {
        // If no article found for today, default to the first article
        if (this.articles.length > 0) {
          const firstArticle = this.articles[0];
          this.currentDay[firstArticle.date] = true;
          this.jmf = true;
        } else {
          console.warn("No articles are available.");
        }
      }
    },
  },
};
</script>

<template>
  <q-list bordered class="rounded-borders">
    <div class="q-pa-md q-gutter-sm flex">
      <q-btn color="primary" @click="setCurrentDay"> Beitrag Heute </q-btn>
      <q-btn
        label="Frage Stellen"
        to="/ask-question"
        color="primary"
        icon="question_answer"
      />
    </div>

    <q-expansion-item
      v-model="jmf"
      icon="list"
      label="Vorbereitung Jugendweihnachtsfeier"
      caption="Artikel & Musik & Reden"
    >
      <q-expansion-item
        v-for="(article, index) in filteredArticles"
        :key="article.title"
        v-model="currentDay[article.date]"
        icon="view_day"
        group="somegroup"
        :header-inset-level="0"
      >
        <template v-slot:header>
          <q-item-section caption="test" avatar>
            <q-chip size="md" color="primary" text-color="white">
              {{ index + 1 }}
            </q-chip>
          </q-item-section>
          <q-item-section>
            <div class="text-weight-bolder">{{ article.title }}</div>
            <i>{{ article.author }}</i>
            <div>{{ article.date }}</div>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <audio
              @error="() => (article.hasAudio = false)"
              v-if="article.hasAudio"
              controls
              :src="article.audio"
              type="audio/mpeg"
            >
              Your browser does not support the audio element.
            </audio>
            <div v-html="article.subtitle" class="text-weight-bolder"></div>
            <div v-html="article.content"></div>
            <div class="q-mt-md">
              <q-input
                filled
                v-model="article.response"
                label="Was sind deine Gedanken dazu?"
                hint="Was du hier schreibst kannst du später nochmal lesen."
                type="textarea"
                @change="saveResponse(article.date, article.response)"
              ></q-input>
            </div>

            <div v-if="article.date == 'Freitag 8. Dezember'">
              <SubmitForm />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-expansion-item>
  </q-list>
</template>

<script>
import SubmitForm from "src/components/SubmitForm.vue";

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
  computed: {
    filteredArticles() {
      const today = new Date();
      return this.articles.filter((article) => {
        const articleDate = this.parseDate(article.date);
        return articleDate && articleDate <= today;
      });
    },
  },
  methods: {
    formatDate(date) {
      // Format the date as "Montag 21. November"
      const dayOfWeek = date.toLocaleString("de-DE", { weekday: "long" });
      const day = date.getDate();
      const month = date.toLocaleString("de-DE", { month: "long" });
      return `${dayOfWeek} ${day}. ${month}`;
    },
    parseDate(dateStr) {
      const months = [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ];
      const parts = dateStr.split(" ");
      const day = parseInt(parts[1]);
      const monthIndex = months.indexOf(parts[2]);
      const year = new Date().getFullYear(); // Assuming the current year

      if (monthIndex === -1) {
        console.error("Invalid month in date:", dateStr);
        return null;
      }

      return new Date(year, monthIndex, day);
    },

    loadArticles() {
      fetch("/articles/articles.json")
        .then((response) => response.json())
        .then((filenames) => {
          // Create an array of Promises for each article fetch
          const fetchPromises = filenames.map((filename) => {
            return fetch(`/articles/${filename}.txt`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
              })
              .then((text) => {
                const lines = text.split("\n");
                const title = lines[0];
                let subtitle = "";
                let author = "";
                let contentStartIndex = 1;

                if (lines[1] && lines[1].startsWith("Author:")) {
                  author = lines[1].substring(7).trim(); // Extract author name
                  contentStartIndex = 2;
                } else if (lines.length > 1) {
                  subtitle = lines[1];
                  if (lines[2] && lines[2].startsWith("Author:")) {
                    author = lines[2].substring(7).trim(); // Extract author name
                    contentStartIndex = 3;
                  } else {
                    contentStartIndex = 2;
                  }
                }

                const content = this.formatContent(
                  lines.slice(contentStartIndex)
                );
                const audio = `/articles/audio/${filename}.mp3`; // Path to the audio file

                return {
                  title,
                  subtitle,
                  author,
                  content,
                  audio,
                  hasAudio: true,
                  date: filename,
                  response: "", // Initialize response property
                };
              });
          });

          // Wait for all fetch Promises to resolve
          return Promise.all(fetchPromises);
        })
        .then((articles) => {
          // Now that all articles are fetched, load responses
          this.articles = articles.map((article) => {
            const savedResponse = localStorage.getItem(article.date) || "";
            return { ...article, response: savedResponse };
          });
        })
        .catch((error) => {
          console.error("Error loading articles list:", error);
        });
    },

    saveResponse(articleDate, response) {
      localStorage.setItem(articleDate, response);
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
  components: {
    SubmitForm,
  },
};
</script>

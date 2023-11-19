<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      expand-separator
      icon="book"
      :label="bookName"
      :caption="bookSubtitle"
    >
      <q-expansion-item
        v-for="(chapter, index) in filteredChapters"
        :key="chapter.title"
        v-model="currentDay[chapter.formattedDate]"
        expand-separator
        group="somegroup"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-chip size="md" color="primary" text-color="white">
              {{ chapter.number }}
            </q-chip>
          </q-item-section>
          <q-item-section>
            <div class="text-weight-bolder">{{ chapter.title }}</div>
            <i> {{ chapter.author }} </i>
            <div v-if="chapter.date">
              {{ formatDate(new Date(chapter.date)) }}
            </div>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <b>{{ chapter.subtitle }}</b>
            <br /><br />
            <div v-html="chapter.content"></div>
            <div class="q-mt-md">
              <q-input
                filled
                v-model="chapter.response"
                label="Was sind deine Gedanken dazu?"
                hint="Was du hier schreibst kannst du später nochmal lesen."
                type="textarea"
                @change="saveResponse(chapter.title, chapter.response)"
              ></q-input>
            </div>

            <div v-if="index === bookChapters.length - 1">
              <SubmitForm />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-expansion-item>
  </q-list>
</template>

<script>
import SubmitForm from "./SubmitForm.vue";

export default {
  name: "BookContent",
  props: {
    bookFile: {
      type: String,
      required: true,
    },
  },
  computed: {
    bookName() {
      // Extract the filename from the path and remove the '.txt' extension
      const fileName = this.bookFile.split("/").pop();
      return fileName.replace(".txt", "");
    },
    filteredChapters() {
      const today = new Date("20.11.2023");
      return this.bookChapters.filter((chapter) => {
        const chapterDate = new Date(chapter.date);
        return chapterDate && chapterDate <= today;
      });
    },
  },
  data() {
    return {
      bookChapters: [],
      bookSubtitle: "",
    };
  },
  mounted() {
    this.loadBook();
  },

  methods: {
    async loadBook() {
      const response = await fetch(this.bookFile);
      const text = await response.text();
      this.bookChapters = this.parseBook(text);
    },
    parseBook(text) {
      const chapterRegex =
        /Kapitel (\d+)\n(.*?)(?:\n(.*?))?(?:\nDate: (.*?))?(?:\nAuthor: (.*?))?\n([^]+?)(?=\nKapitel \d+|\n*$)/g;
      let chapters = [];
      let matches;
      while ((matches = chapterRegex.exec(text)) !== null) {
        const chapterNumber = matches[1].trim();
        const title = matches[2].trim();
        const subtitle = matches[3] ? matches[3].trim() : null;
        const date = matches[4]
          ? this.formatDateFromString(matches[4].trim())
          : null;
        const author = matches[5] ? matches[5].trim() : null;
        const content = this.formatContent(matches[6].trim().split("\n"));
        const savedResponse = localStorage.getItem(title) || "";

        chapters.push({
          number: chapterNumber,
          title: title,
          subtitle: subtitle,
          date: date,
          author: author,
          content: content,
          response: savedResponse,
        });
      }
      return chapters;
    },

    formatContent(lines) {
      // Separate paragraphs with empty lines
      return lines.map((line) => `<p>${line}</p>`).join("<p></p>");
    },
    saveResponse(chapterTitle, response) {
      console.log(chapterTitle, response);
      localStorage.setItem(chapterTitle, response);
    },
    formatDateFromString(dateStr) {
      if (!dateStr) return null;
      const [day, month, year] = dateStr.split("-").map(Number);

      // Create the date at noon UTC to avoid any DST issues
      const date = new Date(Date.UTC(year, month - 1, day, 12));

      // Then adjust for the local timezone
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

      return this.formatDate(date);
    },

    formatDate(date) {
      if (!(date instanceof Date)) return null;
      const dayOfWeek = date.toLocaleString("de-DE", { weekday: "long" });
      const day = date.getDate();
      const month = date.toLocaleString("de-DE", { month: "long" });
      return `${dayOfWeek} ${day}. ${month}`; // "Montag 20. November"
    },
  },
  components: { SubmitForm },
};
</script>

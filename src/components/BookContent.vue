<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      expand-separator
      icon="book"
      :label="bookName"
      :caption="bookSubtitle"
    >
      <q-expansion-item
        v-for="(chapter, index) in bookChapters"
        :key="chapter.title"
        expand-separator
        v-model="chapter.isOpen"
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
            <div v-if="chapter.subtitle">
              {{ chapter.subtitle }}
            </div>
          </q-item-section>
        </template>
        <q-card v-if="chapter.content">
          <q-card-section v-if="chapter.isOpen">
            <audio
              @error="() => (chapter.hasAudio = false)"
              v-if="chapter.hasAudio"
              controls
              :src="`/books/audio/${bookName}/${chapter.title}.mp3`"
              type="audio/mpeg"
            >
              Your browser does not support the audio element.
            </audio>
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
      this.extractSubtitle(text);
      this.parseBook(text);
    },
    parseBook(text) {
      const chapterRegex = /Kapitel (\d+)\n([^]+?)(?=\nKapitel \d+|\n*$)/g;
      let chapters = [];
      let matches;
      while ((matches = chapterRegex.exec(text)) !== null) {
        const chapterNumber = matches[1].trim();
        const chapterContent = matches[2].trim();
        const chapterLines = chapterContent
          .split("\n")
          .filter((line) => line.trim() !== "");
        const title = chapterLines.shift().trim(); // First line is the title
        let subtitle = null;
        // Heuristic approach to determine if the next line is a subtitle or just a paragraph
        if (
          chapterLines.length > 0 &&
          !chapterLines[0].endsWith(".") &&
          chapterLines[0].length < 100
        ) {
          subtitle = chapterLines.shift().trim(); // Likely a subtitle
        }

        const savedResponse = localStorage.getItem(title) || "";
        // Rejoin the remaining lines to form the content with empty lines between paragraphs
        const content = this.formatContent(chapterLines);
        const audio = `/books/audio/${this.bookName}/${title}.mp3`; // Path to the audio file

        chapters.push({
          number: chapterNumber,
          title: title,
          subtitle: subtitle,
          content: content,
          isOpen: false,
          audio,
          hasAudio: true,
          response: savedResponse,
        });
      }
      this.bookChapters = chapters;
    },
    extractSubtitle(text) {
      const lines = text.split("\n");
      this.bookSubtitle = lines.length >= 2 ? lines[1].trim() : "";
    },
    formatContent(lines) {
      // Separate paragraphs with empty lines
      return lines.map((line) => `<p>${line}</p>`).join("<p></p>");
    },
    saveResponse(chapterTitle, response) {
      console.log(chapterTitle, response);
      localStorage.setItem(chapterTitle, response);
    },
  },
  components: { SubmitForm },
};
</script>

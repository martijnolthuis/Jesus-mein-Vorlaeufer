<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      expand-separator
      icon="book"
      :label="bookName"
      :caption="bookSubtitle"
    >
      <q-expansion-item
        v-for="chapter in bookChapters"
        :key="chapter.number"
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
            <div v-if="chapter.subtitle">
              {{ chapter.subtitle }}
            </div>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <div v-html="chapter.content"></div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-expansion-item>
  </q-list>
</template>

<script>
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

        // Rejoin the remaining lines to form the content with empty lines between paragraphs
        const content = this.formatContent(chapterLines);

        chapters.push({
          number: chapterNumber,
          title: title,
          subtitle: subtitle,
          content: content,
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
  },
};
</script>
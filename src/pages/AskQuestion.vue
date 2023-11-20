<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 600px; margin: 0 auto">
      <h4>Stelle eine Frage</h4>
      <q-form class="q-gutter-md" @submit.prevent="sendData">
        <q-input
          filled
          v-model="question"
          label="Deine Frage"
          type="textarea"
          hint="Deine Frage bleibt anonym"
          name="question"
        />
        <input type="hidden" name="_captcha" value="false" />
        <q-btn label="Absenden" type="submit" color="primary" />
      </q-form>
      <br />
      <!-- Questions and Answers Section -->
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          v-for="(item, index) in questionsAndAnswers"
          :key="index"
          group="qna-group"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-chip size="md" color="primary" text-color="white">
                {{ index + 1 }}
              </q-chip>
            </q-item-section>
            <q-item-section>
              <div class="text-weight-bolder">{{ item.question }}</div>
            </q-item-section>
          </template>
          <q-card flat bordered>
            <q-card-section>
              <div v-html="item.answer"></div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>
<script>
import { submitForm } from "src/utils/formSubmitter";

export default {
  data() {
    return {
      question: "",
      questionsAndAnswers: [],
    };
  },
  mounted() {
    this.loadQuestionsAndAnswers();
  },
  methods: {
    sendData() {
      const formData = new FormData();
      formData.append("question", this.question);

      submitForm(formData);
    },
    loadQuestionsAndAnswers() {
      fetch("q&a.txt")
        .then((response) => response.text())
        .then((text) => {
          this.questionsAndAnswers = this.parseQuestionsAndAnswers(text);
        });
    },

    parseQuestionsAndAnswers(text) {
      const items = [];
      let currentQuestion = "";
      let currentAnswerLines = [];

      text.split("\n").forEach((line) => {
        if (line.startsWith("Frage:")) {
          if (currentQuestion) {
            items.push(this.createQnAItem(currentQuestion, currentAnswerLines));
          }
          currentQuestion = line.substring("Frage:".length).trim();
          currentAnswerLines = [];
        } else if (line.trim()) {
          currentAnswerLines.push(line.trim());
        }
      });

      if (currentQuestion) {
        items.push(this.createQnAItem(currentQuestion, currentAnswerLines));
      }

      return items;
    },

    createQnAItem(question, answerLines) {
      const formattedAnswer = answerLines.join("<br><br>");
      return {
        question: question,
        answer: this.removeExtraBreaks(formattedAnswer),
      };
    },

    removeExtraBreaks(text) {
      return text.endsWith("<br><br>") ? text.slice(0, -8) : text;
    },
  },
};
</script>

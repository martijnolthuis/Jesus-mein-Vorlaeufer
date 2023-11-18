<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 600px; margin: 0 auto">
      <h4>Stelle eine anonyme Frage</h4>
      <q-form class="q-gutter-md" @submit.prevent="sendData">
        <q-input
          filled
          v-model="question"
          label="Deine Frage"
          type="textarea"
          hint="Schreibe hier deine Frage"
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
      const lines = text.split("\n");
      let currentQuestion = "";
      let currentAnswer = "";

      lines.forEach((line) => {
        if (line.startsWith("Frage:")) {
          if (currentQuestion) {
            items.push({
              question: currentQuestion,
              answer: currentAnswer.trim(),
            });
          }
          currentQuestion = line.substring("Frage:".length).trim();
          currentAnswer = "";
        } else if (line.trim()) {
          currentAnswer += line + "<br>" + "<br>"; // Use <br> for line breaks in answers
        }
      });

      // Add the last Q&A pair if it exists
      if (currentQuestion) {
        items.push({ question: currentQuestion, answer: currentAnswer.trim() });
      }

      return items;
    },
  },
};
</script>

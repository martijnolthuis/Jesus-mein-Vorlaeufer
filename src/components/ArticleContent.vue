<template>
  <q-list bordered class="rounded-borders">
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="primary" @click="setCurrentDay(today())">
        Artikel von Heute
      </q-btn>
    </div>
    <q-expansion-item
      v-model="jmf"
      expand-separator
      icon="list"
      class="text-h5"
      label="Jesus mein Vorläufer"
    >
      <q-expansion-item
        v-for="day in articleContent"
        :key="day.date"
        v-model="currentDay[day.date]"
        popup
        icon="view_day"
        :label="day.title"
        :header-inset-level="0.5"
        group="somegroup"
        :caption="day.date"
        class="text-h6"
      >
        <q-card>
          <q-card-section class="text-caption">
            {{ day.content }}
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-expansion-item>
  </q-list>
</template>

<script>
import { articleContent } from "../data/articleContent"; // Adjust the path as per your structure

export default {
  name: "WeekPlan",
  data() {
    return {
      currentDay: {},
      jmf: false,
      articleContent, // Use the imported articleContent
    };
  },
  methods: {
    today() {
      // Helper function to format dates
      const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
        });
      };

      let todayDate = new Date();
      let dayOfWeek = todayDate.getDay();

      // Adjust for weekends: set to Friday if today is Saturday (6) or Sunday (0)
      if (dayOfWeek === 0) {
        todayDate.setDate(todayDate.getDate() - 2); // Go back 2 days to Friday
      } else if (dayOfWeek === 6) {
        todayDate.setDate(todayDate.getDate() - 1); // Go back 1 day to Friday
      }

      const formattedToday = formatDate(todayDate);

      // Find matching article or return the first article's date
      return (
        this.articleContent.find(
          (item) => formatDate(new Date(item.date)) === formattedToday
        )?.date || this.articleContent[0].date
      );
    },
    setCurrentDay(day) {
      this.currentDay[day] = true;
      this.jmf = true;
    },
  },
};
</script>

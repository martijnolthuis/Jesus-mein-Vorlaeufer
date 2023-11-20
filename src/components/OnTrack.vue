<template>
  <div class="on-track-indicator">
    <q-linear-progress
      :value="progressValue"
      color="green"
      stripe
      class="progress-bar"
    ></q-linear-progress>
    <div class="text-center">
      Du hast bei {{ articlesRespondedTo }} von {{ totalArticles }} Tage etwas
      geschrieben.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleDates: [
        "2023-11-20",
        "2023-11-21",
        "2023-11-22",
        "2023-11-23",
        "2023-11-24",
        "2023-11-27",
        "2023-11-28",
        "2023-11-29",
        "2023-11-30",
        "2023-12-01",
        "2023-12-04",
        "2023-12-05",
        "2023-12-06",
        "2023-12-07",
        "2023-12-08",
      ],
    };
  },
  computed: {
    totalArticles() {
      return this.articleDates.filter((date) => new Date(date) <= new Date())
        .length;
    },
    articlesRespondedTo() {
      return this.articleDates.filter((date) => {
        return localStorage.getItem(
          this.formatDateForLocalStorage(new Date(date))
        );
      }).length;
    },
    progressValue() {
      if (this.totalArticles === 0) return 0;
      return (this.articlesRespondedTo / this.totalArticles) * 100; // Percentage
    },
  },
  methods: {
    formatDateForLocalStorage(date) {
      const weekday = date.toLocaleString("de-DE", { weekday: "long" }); // e.g., Montag
      const day = date.getDate(); // Day as a number
      const month = date.toLocaleString("de-DE", { month: "long" }); // e.g., November

      return `${weekday} ${day}. ${month}`; // Formats to "Montag 20. November"
    },
  },
};
</script>

<style scoped>
.on-track-indicator {
  padding: 10px;
}

.progress-bar {
  height: 20px; /* Adjust height as needed */
}
</style>

<template>
  <div class="on-track-indicator">
    <div class="status-bar">
      <div class="status-start">
        <strong class="number">{{ articlesRespondedTo }}</strong>
      </div>

      <q-linear-progress
        :value="progressValue"
        color="green"
        stripe
        class="progress-bar"
      ></q-linear-progress>

      <div class="status-end">
        <strong class="number">{{ totalArticles }}</strong>
      </div>
    </div>
    <div v-if="progressValue < 1" class="status-text">
      Schreibe etwas bei alle Beiträge um auf 100% zu kommen
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
      updateTrigger: 0, // Dummy property to trigger updates
    };
  },
  computed: {
    totalArticles() {
      return this.articleDates.filter((date) => new Date(date) <= new Date())
        .length;
    },
    articlesRespondedTo() {
      console.log("Recomputing articlesRespondedTo", this.updateTrigger);

      return this.articleDates.filter((date) => {
        return localStorage.getItem(
          this.formatDateForLocalStorage(new Date(date))
        );
      }).length;
    },
    progressValue() {
      if (this.totalArticles === 0) return 0;
      return this.articlesRespondedTo / this.totalArticles; // Percentage
    },
  },
  methods: {
    formatDateForLocalStorage(date) {
      const weekday = date.toLocaleString("de-DE", { weekday: "long" }); // e.g., Montag
      const day = date.getDate(); // Day as a number
      const month = date.toLocaleString("de-DE", { month: "long" }); // e.g., November

      return `${weekday} ${day}. ${month}`; // Formats to "Montag 20. November"
    },
    updateStatus() {
      this.updateTrigger++; // Modify dummy property to trigger reactivity
    },
  },
};
</script>

<style scoped>
.on-track-indicator {
  padding-bottom: 10px;
}

.status-bar {
  display: flex;
  align-items: center;
}

.status-start,
.status-end {
  display: flex;
  align-items: center;
}

.progress-bar {
  flex-grow: 1; /* Progress bar takes the available space */
  margin: 0 10px;
  padding: 8px; /* Spacing around the progress bar */
}

.number {
  font-weight: bold;
  font-size: 1.3em; /* Larger and bold for emphasis */
}
.status-text {
  text-align: center;
  font-size: 0.9em;
}
</style>

<template>
  <q-list bordered class="rounded-borders">
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="primary" @click="setCurrentDay(today())">
        Artikel von Heute
      </q-btn>
    </div>
    <q-expansion-item expand-separator icon="list" label="Jesus mein Vorläufer">
      <q-expansion-item
        v-model="currentDay['First']"
        popup
        icon="view_day"
        label="Tag 1 | Montag 20. November"
        :header-inset-level="0.5"
        group="somegroup"
      >
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        v-model="currentDay['Second']"
        popup
        icon="view_day"
        label="Dienstag"
        :header-inset-level="0.5"
        group="somegroup"
      >
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-expansion-item>
  </q-list>
</template>

<script>
import { ref } from "vue";

export default {
  name: "WeekPlan",
  data() {
    return {
      currentDay: {},
    };
  },
  methods: {
    today() {
      const date = new Date();
      const options = { day: "2-digit", month: "long" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      const day = {
        "November 20": "First",
        "November 14": "Second",
        "November 22": "Third",
        "November 23": "Fourth",
        "November 24": "Fifth",
        "November 25": "Sixth",
        "November 28": "Seventh",
        "November 29": "Eighth",
        "November 30": "Ninth",
        "December 01": "Tenth",
        "December 02": "Eleventh",
        "December 05": "Twelfth",
        "December 06": "Thirteenth",
        "December 07": "Fourteenth",
        "December 08": "Fifteenth",
      };
      return day[formattedDate] || "";
    },
    setCurrentDay(day) {
      this.currentDay[day] = true;
    },
  },
};
</script>

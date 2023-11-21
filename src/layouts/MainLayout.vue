<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <img src="jmv.png" alt="Logo" class="logo" />

        <q-toolbar-title> Jesus - mein Vorläufer </q-toolbar-title>
        <q-btn
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'brightness_2' : 'light_mode'"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-item clickable to="/" exact class="main-menu-item">
        <q-item-section avatar>
          <q-icon name="home" size="md" />
        </q-item-section>
        <q-item-section class="menu-text">Startseite</q-item-section>
      </q-item>
      <q-item clickable to="/ask-question" class="main-menu-item">
        <q-item-section avatar>
          <q-icon name="question_answer" size="md" />
        </q-item-section>
        <q-item-section class="menu-text">Frage stellen</q-item-section>
      </q-item>
      <!-- Trennlinie -->
      <q-separator />
      <q-list>
        <q-item-label header> Siehe auch diese Webseiten </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal class="custom-footer">
      <q-toolbar>
        <q-toolbar-title class="text-caption">
          © Copyright Stiftelsen Skjulte Skatters Forlag</q-toolbar-title
        >
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "BCCs digitale Bibliothek",
    caption: "literature.bcc.no",
    icon: "library_books",
    link: "https://literature.bcc.no/books/71/1",
  },
  {
    title: "Jesus mein Vorläufer | Playlist",
    caption: "BMM App",
    icon: "person",
    link: "https://bmm.brunstad.org/playlist/shared/4bb7705589b149db9c1366c700ca82d2",
  },
  {
    title: "Active Christianity",
    caption: "aktiveschristentum.de",
    icon: "toggle_on",
    link: "https://aktiveschristentum.de/",
  },
  {
    title: "Ein so großes Heil",
    caption: "BCC Literature",
    icon: "book",
    link: "https://literature.bcc.no/books/71",
  },
  {
    title: "Christus offenbart im Fleisch",
    caption: "BCC Literature",
    icon: "book",
    link: "https://literature.bcc.no/books/53",
  },
  {
    title: "Å være kristen",
    caption: "BCC Literature",
    icon: "book",
    link: "https://literature.bcc.no/books/89",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 3px;
  background-color: rgb(24, 118, 210);
}
.main-menu-item {
  background-color: rgba(
    24,
    118,
    210,
    0.1
  ); /* Leichter Hintergrund für Hauptmenüpunkte */
}

.menu-header {
  padding: 10px;
  font-weight: bold;
  color: #1876d2; /* Stil für den Menü-Titel */
}

.menu-text {
  font-size: 16px; /* oder eine andere Größe, die Sie bevorzugen */
  font-weight: bold; /* optional für fettgedruckten Text */
}

.custom-footer .q-toolbar {
  min-height: 35px; /* Should match the height of the footer */
}
</style>

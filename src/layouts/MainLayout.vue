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
        <q-toolbar-title> Jesus mein Vorläufer </q-toolbar-title>
        <!-- <LoginComponent /> -->
        <q-btn
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'brightness_2' : 'brightness_5'"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
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

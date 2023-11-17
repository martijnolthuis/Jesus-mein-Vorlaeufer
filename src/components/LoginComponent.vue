<template>
  <div id="telegram-login"></div>
</template>

<script>
export default {
  name: "TelegramLogin",
  mounted() {
    this.loadTelegramWidget();
  },
  methods: {
    loadTelegramWidget() {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?7";
      script.setAttribute("data-telegram-login", ""); // Replace with your bot's username
      script.setAttribute("data-size", "large");
      script.setAttribute("data-radius", "10");
      script.setAttribute("data-auth-url", ""); // Replace with your auth URL
      script.setAttribute("data-request-access", "write");

      // Append the script to the div
      document.getElementById("telegram-login").appendChild(script);
    },
  },
};
</script>

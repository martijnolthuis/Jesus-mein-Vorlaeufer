// src/utils/formSubmitter.js
import { Notify } from 'quasar';

export function submitForm(formData) {
  formData.append("_captcha", "false");

  fetch("https://formsubmit.co/martijn.olthuis2@gmail.com", {
    method: "POST",
    body: formData,
  })
    .then(response => {
      if (response.ok) {
        Notify.create({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Erfolgreich Abgeschickt!",
        });
      } else {
        Notify.create({
          color: "red-5",
          textColor: "white",
          icon: "error",
          message: "Failed to send responses. Please try again.",
        });
      }
    })
    .catch(error => {
      console.error("Error:", error);
      Notify.create({
        color: "red-5",
        textColor: "white",
        icon: "error",
        message: "An error occurred while sending responses.",
      });
    });
}

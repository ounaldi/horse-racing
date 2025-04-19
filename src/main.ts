import App from "@/App.vue";
import "@/styles.css";
import { createPinia } from "pinia";
import { createApp } from "vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");

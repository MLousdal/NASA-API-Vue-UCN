import { createApp } from "vue";
import App from "./App.vue";
import * as theme from "./themeToggle";

createApp(App).mount("#app");

window.addEventListener("load", theme.applyTheme());

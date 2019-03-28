import { createRouter } from "./router";
import App from "./App.vue";

export function createApp() {
  const router = createRouter();

  //   const store = {};

  const app = {
    router,
    render: h => h(App)
  };

  return {
    app,
    router
    // store
  };
}

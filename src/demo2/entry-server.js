import Vue from "vue";
import { createApp } from "./app";

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();
    const _app = new Vue(app);
    router.push(context.url);

    const matchedComponents = router.getMatchedComponents();
    // 404
    if (!matchedComponents.length) {
      reject({ code: 404 });
    }

    resolve(_app);
  });
};

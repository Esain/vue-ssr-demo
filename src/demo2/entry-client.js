import { createApp } from "./app";
import Vue from "vue";

const mountedApp = context => {
  const _app = new Vue(context.app);
  _app.$mount("#app");
};

mountedApp(createApp());

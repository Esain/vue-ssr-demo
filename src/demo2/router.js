import Router from "vue-router";
import Vue from "vue";
import Hello from "./components/Hello.vue";
import HelloUser from "./components/HelloUser.vue";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    base: "/",
    routes: [
      {
        path: "/hello",
        component: Hello
      },
      {
        path: "/hello/:userName",
        component: HelloUser
      }
    ]
  });
}

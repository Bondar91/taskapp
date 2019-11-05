import Vue from "vue";
import Router from "vue-router";
// eslint-disable-next-line import/no-unresolved
import Board from "@/views/Board.vue";
import Task from "@/views/Task.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "board",
      component: Board,
      children: [
        {
          path: "task/:id",
          name: "task",
          component: Task
        }
      ]
    }
  ]
});

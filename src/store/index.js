import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "../deafult-board";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;
const store = new Vuex.Store({
  state: {
    board
  },
  getters: {
    getTask(state) {
      // eslint-disable-next-line consistent-return
      return (id) => {
        // eslint-disable-next-line guard-for-in
        // eslint-disable-next-line no-restricted-syntax
        for (const column of state.board.columns) {
        //   console.log(column);
          // eslint-disable-next-line no-restricted-syntax
          for (const task of column.tasks) {
            console.log(task.id === id);
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});

store.subscribe((mutation, state) => {
  const serilizedState = JSON.stringify(state.board);
  localStorage.setItem("board", serilizedState);
});

export default store;

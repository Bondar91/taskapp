import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "../deafult-board";
import { uuid } from "../utils";

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
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    }
  },
  mutations: {
    CREATE_TASK(state, { tasks, description, type }) {
      tasks.push({
        description,
        id: uuid(),
        type
      });
    },
    UPDATE_TASK(state, { task, description, type }) {
      task.description = description;
      task.type = type;
    },
    DELETE_TASK(state, { task, indexColumn }) {
      console.log(state.board.columns[indexColumn]);
      state.board.columns[indexColumn].tasks = state.board.columns[indexColumn].tasks.filter(
        id => id !== task
      );
    }
  },
  actions: {},
  modules: {}
});

store.subscribe((mutation, state) => {
  const serilizedState = JSON.stringify(state.board);
  localStorage.setItem("board", serilizedState);
});

export default store;

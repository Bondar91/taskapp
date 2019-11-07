<template>
  <div class="board">
    <div class="btn-wrapper">
      <button class="btn-create" @click="goToCreateTask">Add new task</button>
    </div>

    <div class="create-task" v-if="isOpenCreateTask">
      <div class="create-task-view">
        <h1 class="heading">Create new task</h1>
        <div class="form">
          <div class="form-group">
            <label for="description" class="form-label">Description Task</label>
            <textarea
              name="description"
              class="form-textarea"
              rows="4"
              v-model="description
            "
            ></textarea>
          </div>
          <div class="form-group">
            <label for="type" class="form-label">Type Task</label>
            <select name="type" class="form-select" v-model="type">
              <option value="default">default</option>
              <option value="bugfix">bugfix</option>
              <option value="feature">feature</option>
            </select>
          </div>

          <button
            class="btn-create"
            @click="createTask(board.columns[0].tasks)
          "
          >Add new task</button>
        </div>
        <span class="close" @click="close">X</span>
      </div>
    </div>

    <div class="column-wrapper">
      <div class="column" v-for="(column, $indexColumn) of board.columns" :key="$indexColumn">
        <div class="column-header">{{column.status}}</div>

        <div class="column-body">
          <div
            class="task"
            v-for="(task, $indexTask) of column.tasks"
            :key="$indexTask"
            @click="goToTask(task)"
          >
            <p class="task-description">{{task.description}}</p>
            <p class="task-type">{{task.type}}</p>
            <!-- {{task}} -->
          </div>
        </div>
      </div>
    </div>

    <div class="task-wrapper" v-if="isTaskOpen">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      description: "",
      type: "default",
      isOpenCreateTask: false
    };
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    },
    goToCreateTask() {
      this.isOpenCreateTask = true;
    },
    close() {
      this.isOpenCreateTask = false;
    },
    createTask(tasks) {
      console.log(this.type);
      this.$store.commit("CREATE_TASK", {
        tasks,
        description: this.description,
        type: this.type
      });

      this.description = "";
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.board {
  @include centerJustify;

  flex-direction: column;
  max-width: 100%;
  min-height: 100vh;
  padding: 0 40px;
}

.column-wrapper {
  display: flex;
  flex-direction: row;
}

.column {
  min-width: 350px;
  width: 100%;
  background-color: #cbd5e0;
  padding: 20px;
  margin-right: 25px;
  border-radius: 5px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  &:last-child {
    margin-right: 0;
  }
  &-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-weight: bold;
  }
}

.task {
  width: 100%;
  padding: 15px;
  background-color: #edf2f7;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  &-description {
    width: 100%;
    font-weight: normal;
    margin-bottom: 10px;
  }

  &-type {
    width: 100%;
  }

  /* &-wrapper {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
  } */
}

.create-task {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* z-index: 999; */

  &-view {
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 2.2rem;
  cursor: pointer;
}

.btn-wrapper {
  @include centerJustify;
}

.btn-create {
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 600;
  color: $black;
  text-align: center;
  border: 1px solid transparent;
  padding: 0.5rem 2.75rem;
  line-height: 1.5;
  border-radius: 0.5rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-bottom: 2rem;
  background-color: #cbd5e0;
  cursor: pointer;
}

.form {
  display: flex;
  flex-direction: column;

  &-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }

  &-label {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  &-textarea,
  &-select {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    resize: vertical;
  }

  &-textarea {
    min-height: 10rem;
  }
}

.heading {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
</style>

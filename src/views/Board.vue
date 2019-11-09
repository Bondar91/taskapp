<template>
  <div class="board">
    <div class="alert alert-success" v-if="alert">
      <h4>{{alertMessageText}}</h4>
    </div>
    <div class="btn-wrapper">
      <button class="btn btn-create" @click="goToCreateTask">Add new task</button>
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
            class="btn btn-create"
            @click="createTask(board.columns[0].tasks)
          "
          >Add new task</button>
        </div>
        <span class="close" @click="close">X</span>
      </div>
    </div>

    <div class="column-wrapper">
      <div
        class="column"
        v-for="(column, $indexColumn) of board.columns"
        :key="$indexColumn"
        @drop="moveTask($event, column.tasks)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="column-header">{{column.status}}</div>

        <div class="column-body">
          <div
            class="task"
            v-for="(task, $indexTask) of column.tasks"
            :key="$indexTask"
            draggable
            @dragstart="pickupTask($event, $indexTask, $indexColumn)"
            :class="{ 'bugfix': task.type=='bugfix', 'default': task.type=='default', 'feature': task.type=='feature'}"
          >
            <div class="task-body">
              <p class="task-description">{{task.description}}</p>
              <p class="task-type">{{task.type}}</p>
            </div>
            <div class="task-btn">
              <button class="btn btn-edit" @click="goToEditTask(task)">
                <font-awesome-icon icon="edit" />
              </button>
              <button class="btn btn-remove" @click="removeTask(task,$indexColumn)">
                <font-awesome-icon icon="trash-alt" />
              </button>
            </div>
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
      isOpenCreateTask: false,
      alert: false,
      alertMessageText: ""
    };
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "taskEdit";
    }
  },
  methods: {
    goToCreateTask() {
      this.isOpenCreateTask = true;
    },
    goToEditTask(task) {
      this.$router.push({ name: "taskEdit", params: { id: task.id } });
    },
    close() {
      this.isOpenCreateTask = false;
    },
    alertMessage() {
      this.alert = true;
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    createTask(tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        description: this.description,
        type: this.type
      });

      this.description = "";
      this.close();
      this.alertMessageText = "Task added correctly!";
      this.alertMessage();
    },
    removeTask(task, indexColumn) {
      // eslint-disable-next-line
      if (window.confirm("Are you sure you want to delete the task?")) {
        this.$store.commit("DELETE_TASK", {
          task,
          indexColumn
        });
        this.alertMessageText = "Task removed correctly!";
        this.alertMessage();
      }
    },
    pickupTask(event, indexTask, fromIndexColumn) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("index-task", indexTask);
      event.dataTransfer.setData("from-index-column", fromIndexColumn);
    },
    moveTask(event, toTasks) {
      const fromIndexColumn = event.dataTransfer.getData("from-index-column");
      const fromTasks = this.board.columns[fromIndexColumn].tasks;
      const indexTask = event.dataTransfer.getData("index-task");

      this.$store.commit("MOVE_TASK", {
        fromTasks,
        toTasks,
        indexTask
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";


.bugfix {
  background-color: #dc143c;
  color: $white;
}

.default {
  background-color: #edf2f7;
}

.feature {
  background-color: #ace1af;
}

.board {
  @include centerJustify;

  flex-direction: column;
  max-width: 100%;
  min-height: 100vh;
  padding: 0 4rem;
}

.column-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 4rem;
}

.column {
  min-width: 350px;
  width: 100%;
  background-color: #cbd5e0;
  padding: 2rem;
  margin-right: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  &:last-child {
    margin-right: 0;
  }
  &-header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    font-weight: $semi-weight;
  }
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  &-body {
    width: 80%;
  }

  &-description {
    margin-bottom: 1rem;
    font-weight: 600;
    text-align: justify;
  }

  &-btn {
    display: flex;
    justify-content: space-between;
    width: 15%;
  }
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
    background: $white;
    border-radius: 0.5rem;
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
  margin: 4rem 0 2rem 0;
}

.btn {
  display: inline-block;
  font-size: 1.8rem;
  font-weight: $semi-weight;
  text-align: center;
  border: 1px solid transparent;
  line-height: 1.5;
  border-radius: 0.5rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;

  &-create {
    color: $black;
    background-color: #cbd5e0;
    padding: 1rem 2.75rem;
  }
  &-edit {
    color: $white;
    background-color: #007bff;
    border-color: #007bff;
    padding: 0.2rem 0.75rem;
  }

  &-remove {
    color: $white;
    background-color: #c82333;
    border-color: #bd2130;
    padding: 0.2rem 0.75rem;
  }

  &-edit,
  &-remove {
    font-size: 1.5rem;
  }
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
    font-weight: $semi-weight;
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
    background-color: $white;
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

.alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  text-align: center;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  font-size: 2rem;
  &-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
}
</style>

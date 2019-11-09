<template>
  <div class="task-view">
    <div class="alert alert-success" v-if="alert">
      <h4>{{alertMessageText}}</h4>
    </div>
    <div class="task-view-wrapper">
      <h1 class="heading">Edit task id: {{task.id}}</h1>
      <div class="form">
        <div class="form-group">
          <label for="description" class="form-label">Description Task</label>
          <textarea
            name="description"
            ref="description"
            class="form-textarea"
            rows="4"
            :value="task.description"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="type" class="form-label">Type Task</label>
          <select name="type" ref="type" class="form-select" :value="task.type">
            <option value="default">default</option>
            <option value="bugfix">bugfix</option>
            <option value="feature">feature</option>
          </select>
        </div>

        <button class="btn-create" @click="updateTask(task.description, task.type)">Save</button>
      </div>
      <span class="close" @click="close">X</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      description: "",
      type: "",
      alert: false,
      alertMessageText: ""
    };
  },
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    }
  },
  methods: {
    close() {
      this.$router.push({ name: "board" });
    },
    alertMessage() {
      this.alert = true;
      this.alertMessageText = "Task updated correctly!";

      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.alert = false;
        this.close();
      }, 3000);
    },
    updateTask() {
      this.$store.commit("UPDATE_TASK", {
        task: this.task,
        description: this.$refs.description.value,
        type: this.$refs.type.value
      });
      this.alertMessage();
    }
  }
};
</script>

<style lang="scss" scoped>
.task-view {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* z-index: 999; */

  &-wrapper {
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

.btn-create {
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 600;
  color: #000000;
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

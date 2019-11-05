<template>
  <div class="task-view">
    <div class="task-view-wrapper">
      {{ task.name }}
      <span class="close" @click="close">X</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    }
  },
  methods: {
    close() {
      console.log("test");
      this.$router.push({ name: "board" });
    }
  }
};
</script>

<style lang="scss">
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
</style>

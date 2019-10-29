<template>
  <div class="board">
    <div class="column-wrapper">
      <div class="column" v-for="column of board.columns" :key="column.id">
        <div class="column-header">{{column.status}}</div>

        <div class="column-body">
          <div class="task" v-for="task of column.tasks" :key="task.id">
            <h1 class="task-title">{{task.name}}</h1>
            <p class="task-description">{{task.description}}</p>
            <p class="task-type">{{task.type}}</p>
            <!-- {{task}} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["board"])
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
  background-color: #cbd5e0;
  padding: 20px;
  margin-right: 25px;
  border-radius: 5px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  &-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-weight: bold;
  }

  &-body {
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

  &-title {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &-description {
    width: 100%;
    font-weight: normal;
    margin-bottom: 10px;
  }

  &-type {
    width: 100%;
  }
}
</style>

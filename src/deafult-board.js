import { uuid } from "./utils";

export default {
  name: "workshop",
  columns: [
    {
      status: "oczekujące",
      tasks: [
        {
          name: "first task",
          description: "",
          id: "1s",
          type: "feature"
        },
        {
          name: "second task",
          description: "Lorem ipsum dolor sit amet.",
          id: uuid(),
          type: "bugfix"
        },
        {
          name: "thirty task",
          description: "Lorem, ipsum dolor.",
          id: uuid(),
          type: "default"
        }
      ]
    },
    {
      status: "w realizacji",
      tasks: [
        {
          name: "first task",
          description: "",
          id: uuid(),
          type: "default"
        },
        {
          name: "second task",
          description: "Lorem ipsum dolor sit amet.",
          id: uuid(),
          type: "bugfix"
        },
        {
          name: "thirty task",
          description: "Lorem, ipsum dolor.",
          id: uuid(),
          type: "feature"
        }
      ]
    },
    {
      status: "zakończone",
      tasks: [
        {
          name: "first task",
          description: "",
          id: uuid(),
          type: "feature"
        },
        {
          name: "second task",
          description: "Lorem ipsum dolor sit amet.",
          id: uuid(),
          type: "feature"
        }
      ]
    }
  ]
};

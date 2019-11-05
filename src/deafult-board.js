import { uuid } from "./utils";

export default {
  name: "workshop",
  columns: [
    {
      status: "oczekujące",
      tasks: [
        {
          description: "",
          id: "1s",
          type: "feature"
        },
        {
          description: "Lorem ipsum dolor sit amet.",
          id: uuid(),
          type: "bugfix"
        },
        {
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
          description: "",
          id: uuid(),
          type: "default"
        },
        {
          description: "Lorem ipsum dolor sit amet.",
          id: uuid(),
          type: "bugfix"
        },
        {
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
          description: "",
          id: uuid(),
          type: "feature"
        },
        {
          description: "Lorem ipsum dolor sit amet.",
          id: uuid(),
          type: "feature"
        }
      ]
    }
  ]
};

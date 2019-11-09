import { uuid } from "./utils";

export default {
  name: "workshop",
  columns: [
    {
      status: "oczekujące",
      tasks: [
        {
          description: "Zrób pizze!",
          id: uuid(),
          type: "feature"
        },
        {
          description: "Posprzątaj swój pokój",
          id: uuid(),
          type: "bugfix"
        },
        {
          description: "Umyj okna",
          id: uuid(),
          type: "default"
        }
      ]
    },
    {
      status: "w realizacji",
      tasks: [
        {
          description: "Kup marchewkę, paprykę i pomidory",
          id: uuid(),
          type: "default"
        },
        {
          description: "Zatankuj samochód",
          id: uuid(),
          type: "bugfix"
        },
        {
          description: "Naczynia czekają. Pozmywaj!",
          id: uuid(),
          type: "feature"
        }
      ]
    },
    {
      status: "zakończone",
      tasks: [
        {
          description: "Kup niebieską farbę i pomaluj ścianę w kuchni",
          id: uuid(),
          type: "feature"
        },
        {
          description: "Złóż zyczenia urodzinowe dla Babci",
          id: uuid(),
          type: "feature"
        }
      ]
    }
  ]
};

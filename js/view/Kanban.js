import Column from "./Column.js";

export default class Kanban {
  constructor(root) {
    this.root = root;

    Kanban.columns().forEach((column) => {
      const columnView = new Column(column.id, column.title);

      this.root.appendChild(columnView.elements.root);
    });
  }

  static columns() {
    return [
      {
        id: 1,
        title: "Monday",
      },
      {
        id: 2,
        title: "Tuesday",

      },
      {
        id: 3,
        title: "Wednesday",

      },
      {
        id: 4,
        title: "Thursday",

      },
      {
        id: 5,
        title: "Friday",

      },
      {
        id: 6,
        title: "Saturday",

      },
      {
        id: 7,
        title: "Sunday",

      },
    ];
  }
}

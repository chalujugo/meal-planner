export default class KanbanAPI {
  //  get all items in a particular column
  static getItems(columnId) {
    // refers to a column in the items array
    const column = read().find((column) => column.id == columnId);
    if (!column) {
      return [];
    }
    return column.items;
  }

  static insertItem(columnId, content) {
    const data = read();
    const column = data.find((column) => column.id == columnId);
    const item = {
      id: Math.floor(Math.random() * 1000000),
      content,
    };
    if (!column) {
      throw new Error("Column does not exist");
    }
    column.items.push(item);
    save(data);

    return item;
  }

  static updateItem(itemId, newProperties) {
    const data = read();
    const [item, currentColumn] = (() => {
      for (const column of data) {
        const item = column.items.find((item) => item.id == itemId);
        if (item) {
          return [item, column];
        }
      }
    })();

    if (!item) {
      throw new Error("Item does not exist");
    }
    item.content =
      newProperties.content === undefined
        ? item.content
        : newProperties.content;

    // update column and col position
    if (
      newProperties.columnId != undefined &&
      newProperties.position != undefined
    ) {
      const targetCol = data.find(
        (column) => column.id == newProperties.columnId
      );

      if(!targetCol) {
        throw new Error("Column does not exist");
      }
    

      // delete item from its current column
      // removes one item from index, effectively deleting the item from its current  column
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

      // move item to its new column position
      targetCol.items.splice(newProperties.position, 0, item);
    }

    save(data);
  }


  static deleteItem(itemId) {
    const data = read();
    for (const col of data) {
      const item = col.items.find((item) => item.id == itemId);
      if (item) {
        col.items.splice(col.items.indexOf(item), 1);
      }

      save(data);
    }
  }
}

function read() {
  const json = localStorage.getItem("kanban-data");
  // if this is the first time user is using kanban board on browser, return default data
  if (!json) {
    return [
      {
        id: 1,
        items: [],
      },

      {
        id: 2,
        items: [],
      },

      {
        id: 3,
        items: [],
      },

      {
        id: 4,
        items: [],
      },

      {
        id: 5,
        items: [],
      },
      {
        id: 6,
        items: [],
      },
      {
        id: 7,
        items: [],
      },
    ];
  }

  return JSON.parse(json);
}

function save(data) {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}

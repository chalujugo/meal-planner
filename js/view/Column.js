import KanbanAPI from "../api/KanbanAPI.js";
import Item from "./Item.js";

export default class Column {
  constructor(id, title) {
    this.elements = {};
    this.elements.root = Column.createRoot();
    this.elements.title = this.elements.root.querySelector(
      ".kanban__column-title"
    );
    this.elements.items = this.elements.root.querySelector(
      ".kanban__column-items"
    );
    this.elements.addItem =
      this.elements.root.querySelector(".kanban__add-item");

    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;

    this.elements.addItem.addEventListener("click", () => {
      const newItem = KanbanAPI.insertItem(id, "", "Dropdown");
      this.renderItem(newItem);
      console.log(newItem)
    });

    KanbanAPI.getItems(id).forEach((item) => {
      this.renderItem(item);
    });
  }

  // return an HTML element as an object containing the basic structure of a particular column
  static createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(`
            <div class="kanban__column">
                <div class="kanban__column-title"></div>
                <div class="kanban__column-items"></div>
            <button class="kanban__add-item" type="button">+ Add</button>
            </div>
     `).children[0];
  }

  renderItem(data) {
    const item = new Item(data.id, data.content, data.category);

    this.elements.items.appendChild(item.elements.root);
  }
}

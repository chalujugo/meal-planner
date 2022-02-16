import KanbanAPI from "../api/KanbanAPI.js";

export default class Item {
  constructor(id, content) {
    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector(
      ".kanban__item-input"
    );

    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;

    this.content = content;

    const onBlur = () => {
      const newContent = this.elements.input.textContent.trim();
      console.log(this.content);
      console.log(newContent);
      if (newContent == this.content) {
        return;
      }

      this.content = newContent;

      KanbanAPI.updateItem(id, {
        content: this.content
      });
    };

    this.elements.input.addEventListener("blur", onBlur);


    const button = this.elements.root.querySelector(
      ".delete-button"
    );

    button.addEventListener("click", () => {
          const check = confirm("Are you sure you want to delete this item?");
          if (check) {
            KanbanAPI.deleteItem(id);
            this.elements.input.removeEventListener("blur", onBlur);
            // go to the parent which refers to the column itself and remove the child element that is the html of the item
            this.elements.root.parentElement.removeChild(this.elements.root);

          }})

    // this.elements.input.addEventListener("blur", onBlur);
    // this.elements.root.addEventListener("dblclick", () => {
    //   const tag = prompt("Enter meal category:", "e.g Lunch")
    // });



 

    this.elements.root.addEventListener("dragstart", e => {
			e.dataTransfer.setData("text/plain", id);
		});

    this.elements.input.addEventListener("drop", e => {
			e.preventDefault();
		});
  }

  static createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(`

                <div class="kanban__item">
                    <div class="delete-button">x</div>
                
                    <div class="kanban__item-input" contenteditable spellcheck="false"></div>
               
                    <div class="meal-tag" contentEditable=true data-text="Meal type" spellcheck="false"></div>
                </div>
         `).children[0];
  }
}

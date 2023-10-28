const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");
// storage
class storage {
  static addToDStorage(todoArray) {
    let storage = localStorage.setItem("todo", JSON.stringify(todoArray));
    return storage;
  }

  static getStorage() {
    let storage =
      localStorage.getItem("todo") === null
        ? []
        : JSON.parse(localStorage.getItem("todo"));
    return storage;
  }
}
// empty array
let todoArray = storage.getStorage();
// form part
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = Math.random() * 100000;
  console.log(id);
  const todo = new Todo(id, input.value);
  console.log(todo);
  todoArray = [...todoArray, todo];
  console.log(todoArray);
  Ui.displayData();
  Ui.clearInput();
  Ui.removeTodo();
  storage.addToDStorage(todoArray);
});
// object instance
class Todo {
  constructor(id, todo) {
    (this.id = id), (this.todo = todo);
  }
}
// UI
class Ui {
  static displayData() {
    let displayData = todoArray.map((item) => {
      return `
        
        <div class="todo">
                <p>${item.todo}</p>
                <span class="remove" data-id=${item.id}>🗑️</span>
            </div> 
        `;
    });
    lists.innerHTML = displayData.join(" ");
  }
  static clearInput() {
    input.value = "";
  }

  static removeTodo() {
    lists.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
      }
      let btnId = e.target.dataset.id;
      Ui.removeFromArray(btnId);
    });
  }
  static removeFromArray(id) {
    todoArray = todoArray.filter((item) => item.id !== +id);
    storage.addToDStorage(todoArray);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  Ui.displayData();
  Ui.removeTodo;
});

window.addEventListener("DOMContentLoaded", function () {
  const form = this.document.querySelector("form");

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    addTodo();
  });

  change.addEventListener("click", function () {
    ChangeTheme();
  });

  tothetop.addEventListener("click", function (ev) {
    ev.preventDefault();

    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  });

  this.document.body.classList.add("dark-theme");

  loadFromLocalStorage();
});

window.addEventListener("scroll", function () {
  const nav = this.document.querySelector("nav");

  if (this.window.scrollY > 50) {
    nav.style.cssText = "padding:1em 2em 1em 2em;";
  } else {
    nav.style.cssText = "padding:0 2em 0 2em;";
  }
});

const inputTodo = document.getElementById("inputTodo");
const inputDate = document.getElementById("inputDate");
const todolist = document.getElementById("todolist");
const finishTodoList = document.getElementById("finishTodo");
const change = document.getElementById("change");
const tothetop = document.getElementById("nav-top");

let todos = [];

function addTodo() {
  const todoText = inputTodo.value;
  const tododate = inputDate.value;

  const todosList = {
    id: createId(),
    text: todoText,
    date: tododate,
    isFinished: false,
  };

  const newParentElement = createTodoElement(todosList);
  todolist.appendChild(newParentElement);
  todos.push(todosList);

  saveToLocalStorage();

  inputTodo.value = "";
  inputDate.value = "";
}

function createId() {
  return Math.random().toString(36).substring(2, 10);
}

function createTodoElement(todo) {
  const parentElement = document.createElement("div");
  const textElement = document.createElement("div");
  const buttonElement = document.createElement("div");
  const header = document.createElement("h1");
  const date = document.createElement("h3");

  header.textContent = todo.text;
  date.textContent = todo.date;

  const finishButton = document.createElement("button");
  finishButton.textContent = "Selesai";
  finishButton.addEventListener("click", function () {
    finishTodo(todo.id, parentElement);
  });
  finishButton.classList = "finish-button";

  textElement.appendChild(header);
  textElement.appendChild(date);
  buttonElement.appendChild(finishButton);
  parentElement.appendChild(textElement);
  parentElement.appendChild(buttonElement);
  parentElement.setAttribute("class", "align-center container");
  parentElement.style.cssText = "display:flex; justify-content:space-evenly;";

  return parentElement;
}

function finishTodo(id, element) {
  todolist.removeChild(element);
  const finishedTodo = todos.find((todo) => todo.id === id);

  if (finishedTodo) {
    finishedTodo.isFinished = true;
    const finishedElement = createFinishedTodoElement(finishedTodo);
    finishTodoList.appendChild(finishedElement);
  }

  saveToLocalStorage();
}

function createFinishedTodoElement(todo) {
  const allElement = document.createElement("div");
  const finishedElement = document.createElement("div");
  const header = document.createElement("h1");
  const date = document.createElement("h3");
  const buttonElement = document.createElement("div");

  header.textContent = todo.text;
  date.textContent = todo.date;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteButtonTodo(todo.id, allElement);
  });
  deleteButton.classList = "delete-button";

  const unFinishButton = document.createElement("button");
  unFinishButton.textContent = "Belum Selesai";
  unFinishButton.addEventListener("click", function () {
    unfinishTodo(todo.id, allElement);
  });
  unFinishButton.classList = "unfinish-button";

  buttonElement.appendChild(deleteButton);
  buttonElement.appendChild(unFinishButton);
  finishedElement.appendChild(header);
  finishedElement.appendChild(date);
  allElement.appendChild(finishedElement);
  allElement.appendChild(buttonElement);
  allElement.setAttribute("class", "align-center container");
  allElement.style.cssText = "display:flex; justify-content:space-evenly;";

  return allElement;
}

function unfinishTodo(id, element) {
  finishTodoList.removeChild(element);
  const finishedTodo = todos.find((todo) => todo.id === id);

  if (finishedTodo) {
    finishedTodo.isFinished = true;
    todos = todos.filter((todo) => todo.id !== id);
    todos.push(finishedTodo);
    const newElement = createTodoElement(finishedTodo);
    todolist.appendChild(newElement);
    saveToLocalStorage();
  }
}

function deleteButtonTodo(id, element) {
  finishTodoList.removeChild(element);
  todos = todos.filter((todo) => todo.id !== id);
}

function ChangeTheme() {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");

  const themeicon = document.getElementById("icon");
  if (document.body.classList.contains("dark-theme")) {
    themeicon.classList.remove("fa-sun");
    themeicon.classList.add("fa-moon");
  } else {
    themeicon.classList.remove("fa-moon");
    themeicon.classList.add("fa-sun");
  }

  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem("todos");

  if (stored) {
    todos = JSON.parse(stored);
    todos.forEach((todo) => {
      if (todo.isFinished) {
        const todoelement = createFinishedTodoElement(todo);
        finishTodoList.appendChild(todoelement);
      } else {
        const todoelement = createTodoElement(todo);
        todolist.appendChild(todoelement);
      }
    });
  }
}

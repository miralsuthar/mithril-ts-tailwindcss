import m from "mithril";
import { globalAction, globalState } from "./models/todos";

const Input = {
  view: function () {
    return m(
      "form",
      {
        onsubmit: function (e: Event) {
          e.preventDefault();
          globalAction.addTodo();
        },
      },
      [
        m("input", {
          type: "text",
          placeholder: "add task",
          value: globalState.todoInput,
          oninput: function (e: Event) {
            globalState.todoInput = (e.target as HTMLInputElement).value;
          },
        }),
        m("button", { className: "bg-red-500", type: "submit" }, "Add task"),
      ]
    );
  },
};

const TodoList = {
  view: function () {
    return m(
      "ul",
      {},
      globalState.todos.map((todo, index) => {
        return m("li", { key: index }, todo);
      })
    );
  },
};

const TodoComponent = {
  view: function () {
    return m("div", {}, [m(Input), m(TodoList)]);
  },
};

m.mount(document.body, TodoComponent);

import m from "mithril";
import { globalAction, globalState } from "./models/todos";
import { cn } from "./utils";

const Input = {
  view: function () {
    return m(
      "form",
      {
        class: "flex justify-center align-center gap-5",
        onsubmit: function (e: Event) {
          e.preventDefault();
          globalAction.addTodo();
        },
      },
      [
        m("input", {
          type: "text",
          placeholder: "add task",
          class: "border px-2 rounded-md border-black",
          value: globalState.todoInput,
          oninput: function (e: Event) {
            globalState.todoInput = (e.target as HTMLInputElement).value;
          },
        }),
        m(
          "button",
          {
            class: cn(
              "bg-blue-400 p-2 rounded-md font-medium text-white hover:bg-blue-500 transition-all",
              globalState.todoInput === "" && "bg-red-400"
            ),
            type: "submit",
          },
          "Add task"
        ),
      ]
    );
  },
};

const Todo = {
  view: function (vnode) {
    return m(
      "li",
      {
        class:
          "flex justify-between text-xl bg-gray-500 text-white rounded-sm hover:bg-gray-700 cursor-pointer my-3 px-2 py-1",
      },
      [
        m("span", {}, vnode.attrs.todo),
        m(
          "button",
          {
            onclick: function () {
              globalAction.deleteTodo(vnode.attrs.index);
            },
            class:
              "text-sm p-1 bg-red-300 rounded-md text-gray-800 font-medium",
          },
          "delete"
        ),
      ]
    );
  },
};

const TodoList = {
  oninit: function () {
    const todos = localStorage.getItem("todos");
    globalState.todos = JSON.parse(todos);
  },
  view: function () {
    return m(
      "ul",
      {},
      globalState.todos.map((todo, index) => {
        return m(Todo, { key: index, todo: todo, index: index });
      })
    );
  },
};

const TodoComponent = {
  view: function () {
    return m("div", { class: "bg-gray-100 w-max mx-auto p-5 rounded-md" }, [
      m(Input),
      m(TodoList),
    ]);
  },
};

m.mount(document.body, TodoComponent);

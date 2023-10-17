import m from "mithril";

const globalState = {
  todos: [],
  todoInput: "",
};

// const globalAction = {
//   changeTodo: (value: string[]) => {
//     globalState.todos = value;
//   },
//   deleteTodo: (index: number) => {
//     console.log(`delete ${index}`);
//     globalState.todos.splice(index, 1);
//   },
// };

const addTodo = () => {
  if (globalState.todoInput === "") {
    return;
  }
  globalState.todos.push(globalState.todoInput);
  globalState.todoInput = "";
};

const Input = {
  view: function () {
    return m(
      "form",
      {
        onsubmit: function (e: any) {
          e.preventDefault();
          addTodo();
        },
      },
      [
        m("input", {
          type: "text",
          placeholder: "add task",
          value: globalState.todoInput,
          oninput: function (e: any) {
            globalState.todoInput = e.target.value;
          },
        }),
        m("button.button", { type: "submit" }, "Add task"),
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

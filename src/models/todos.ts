type GlobalStateType = {
  todos: string[];
  todoInput: string;
};

export const globalState: GlobalStateType = {
  todos: [],
  todoInput: "",
};

export const globalAction = {
  addTodo: () => {
    if (globalState.todoInput === "") {
      return;
    }
    globalState.todos.push(globalState.todoInput);
    localStorage.setItem("todos", JSON.stringify(globalState.todos));
    globalState.todoInput = "";
  },
  deleteTodo: (index: number) => {
    globalState.todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(globalState.todos));
  },
};

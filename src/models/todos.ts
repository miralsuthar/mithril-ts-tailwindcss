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
    globalState.todoInput = "";
  },
};

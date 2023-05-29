function getTodos() {
  let jsonTodos = localStorage.getItem('todos');
  let parsedTodos = JSON.parse(jsonTodos);

  if (!jsonTodos || parsedTodos.length === 0) {
    return [];
  }

  return parsedTodos;
}

function setTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(todo) {
  setTodos([...getTodos(), todo]);

  return getTodos();
}

function toggleCompleted(id) {
  let todos = getTodos();
  let newTodos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed,
      };
    }
    return todo;
  });
  setTodos(newTodos);

  return getTodos();
}

function removeCompletedTodos(todos) {
  let newTodos = todos.filter((todo) => !todo.completed);
  setTodos(newTodos);

  return getTodos();
}

export { getTodos, addTodo, toggleCompleted, removeCompletedTodos };

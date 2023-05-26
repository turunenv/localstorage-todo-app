import { useState, useRef } from 'react';

import TodoList from './components/TodoList.jsx';
import AddTodoForm from './components/AddTodoForm.jsx';
import ErrorMessage from './components/Error.jsx';

import './styles/App.css';

function App() {
  const [nextTodo, setNextTodo] = useState('');
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState(() => parseStoredTodos());

  let errorTimeoutId = useRef(null);

  function parseStoredTodos() {
    const todos = localStorage.getItem('todos');
    if (todos) {
      return JSON.parse(todos);
    }
    return [];
  }

  function updateStoredTodos(todos) {
    const jsonTodos = JSON.stringify(todos);
    localStorage.setItem('todos', jsonTodos);

    const updatedTodos = localStorage.getItem('todos');
    if (updatedTodos) {
      return JSON.parse(updatedTodos);
    }
    return [];
  }

  function handleTodoSubmit(e) {
    e.preventDefault();

    //clear previous error messages
    if (errorTimeoutId.current) {
      errorTimeoutId.current = null;
      setError(null);
    }

    const todoText = document.getElementById("todo").value;

    if (todoText.length === 0) {
      setError('empty todo text');
      return;
    }

    const newTodo = {
      id: self.crypto.randomUUID(),
      text: todoText,
      completed: false,
    }

    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    
    setTodos(JSON.parse(localStorage.getItem('todos')));  
    setNextTodo('');
  }

  function toggleTodoCompleted(id) {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      } else {
        return todo;
      }
    })

    setTodos(updateStoredTodos(newTodos));
  }

  function removeCompleted() {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(updateStoredTodos(newTodos));
  }

  function handleTextChange(e) {
    setNextTodo(e.target.value);
  }

  //display the error message for 2 seconds
  if (error) {
    errorTimeoutId.current = setTimeout(() => {
      setError(null);
    }, 2000)
  }

  let todosToDisplay = todos.toSorted((a,b) => {
    if (!a.completed && b.completed) {
      return -1;
    }
    return 1;
  })

  let numOfCompleted = todos.reduce((acc, currentTodo) => {
    if (currentTodo.completed) {
      return acc + 1;
    }
    return acc;
  }, 0)

  return (
    <>
      <h1>Todos</h1>
      <AddTodoForm 
        todoText={nextTodo}
        handleSubmit={handleTodoSubmit}
        handleTextChange={handleTextChange}
      />

      <ErrorMessage error={error}/>

      {todos.length > 1 ? (
        <TodoList 
          todoList={todosToDisplay} 
          toggleCompleted={toggleTodoCompleted}
        />
      ) : (
        <p>No todos added yet.</p>
      )}

      {(numOfCompleted > 0) &&
        <button onClick={removeCompleted}>
          Remove completed
        </button>
      }

      
    </>
  );
}

export default App;

import { useState, useEffect, useRef } from 'react';

import useImportScript from './hooks/useImportScript.js';
import * as locStorage from './localStorage.js';

import TodoList from './components/TodoList.jsx';
import AddTodoForm from './components/AddTodoForm.jsx';
import ErrorMessage from './components/Error.jsx';

import './styles/App.css';

//fetch the initial todos during module initialization
let initialTodos;
if (typeof window !== 'undefined') {
  initialTodos = locStorage.getTodos();
}

function App() {
  const [nextTodo, setNextTodo] = useState('');
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState(initialTodos);

  useImportScript('/src/static/todoTransitions.js');

  //ref to remove error message timer when user adds a successful todo 
  let errorTimeoutId = useRef(null);

  function getNextTodoId() {
    let largestId = todos.reduce((maxId, nextTodo) => {
        return Math.max(maxId, nextTodo.id)
      }, 0)
    
    return largestId + 1;
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
      id: getNextTodoId(),
      text: todoText,
      completed: false,
    }

    let newTodos = locStorage.addTodo(newTodo);
    
    setTodos(newTodos);  
    setNextTodo('');
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

  function toggleTodoCompleted(id) {
    setTodos(locStorage.toggleCompleted(id));
  }

  return (
    <div className='todo-wrapper'>
      <h1>Todos</h1>
      <AddTodoForm 
        todoText={nextTodo}
        handleSubmit={handleTodoSubmit}
        handleTextChange={handleTextChange}
      />

      <ErrorMessage error={error}/>

      {todos.length > 0 ? (
        <TodoList 
          todoList={todosToDisplay} 
          toggleCompleted={toggleTodoCompleted}
        />
      ) : (
        <p>No todos added yet.</p>
      )}

      {(numOfCompleted > 0) &&
        <button onClick={() => setTodos(locStorage.removeCompletedTodos)}>
          Remove completed
        </button>
      }
    </div>
  );
}

export default App;

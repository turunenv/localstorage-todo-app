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
        <TodoList todoList={todos} />
      ) : (
        <p>No todos added yet.</p>
      )}

      
    </>
  );
}

export default App;

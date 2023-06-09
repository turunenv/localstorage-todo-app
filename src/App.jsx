import { useState, useRef } from 'react';

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
  const [isTimerTodo, setIsTimerTodo] = useState(false);
  const [timerTime, setTimerTime] = useState("15");

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

    if (nextTodo.length === 0) {
      setError('Add a task to complete.');
      return;
    }

    if (isTimerTodo && (timerTime.length === 0 || isNaN(timerTime))) {
      setError('Enter a valid number for the timer.');
      return;
    }

    let newTodo;

    // handle normal todo-items
    if (!isTimerTodo) {
      //set max length for normal todos
      if (nextTodo.length > 23) {
        setError('Try to be more concise.');
        return;
      }
      newTodo = {
        id: getNextTodoId(),
        type: "normal",
        text: nextTodo,
        completed: false,
      } 
    } else {
        // handle timer-todos
        newTodo = {
          id: getNextTodoId(),
          type: "timer",
          text: nextTodo,
          seconds: Number(timerTime) * 60,
          completed: false,
        }
        setTimerTime('15');
      }
  
      let newTodos = locStorage.addTodo(newTodo);
      
      setTodos(newTodos);  
      setNextTodo('');
      return;
    }
  

  function handleTextChange(e, isTimer) {
    let todo = e.target.value;

    //make sure the todo-text will fit the screen
    if ((isTimer && todo.length > 20) || (!isTimer && todo.length > 23)){
      setError('Try to be more concise.');
      return;
      } 

      setNextTodo(e.target.value);
    }
    
  function handleTimerTimeChange(e) {
    setTimerTime(e.target.value);
  }


  function handleTodoTypeChange(e) {
    const cname = 'selected-todo-type';
    if (e.target.className === cname) return;

    let prevSelected = document.querySelector(`.${cname}`);
    prevSelected.className = '';
    e.target.className = cname;


    setIsTimerTodo(!isTimerTodo);
  }

  //display the error message for 2 seconds
  if (error) {
    errorTimeoutId.current = setTimeout(() => {
      setError(null);
    }, 2000)
  }

  let todosToDisplay = todos.toSorted((a,b) => {
    if (a.completed && !b.completed) {
      // non-completed todos should come first
      return 1;
    } else if (a.type === "timer" && b.type === "normal") {
      return 1;
    } 
    return -1;
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

  function updateTimerTime(id, seconds) {
    setTodos(locStorage.updateTimerTime(id, seconds));
  }

  
  return (
    <div className='todo-wrapper'>
      <h1>Tasks</h1>
      <AddTodoForm 
        todoText={nextTodo}
        handleSubmit={handleTodoSubmit}
        handleTextChange={(e) => handleTextChange(e, isTimerTodo)}
        isTimerTodo={isTimerTodo}
        timerTime={timerTime}
        handleTimerTimeChange={handleTimerTimeChange}
        handleTodoTypeChange={handleTodoTypeChange}
      />

      <ErrorMessage error={error}/>

      {todos.length > 0 ? (
        <TodoList 
          todoList={todosToDisplay} 
          toggleCompleted={toggleTodoCompleted}
          updateTimerTime={updateTimerTime}
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

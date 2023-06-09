import { useState, useEffect } from 'react';
import useTimer from '../hooks/useTimer.jsx';
import '../styles/Todo.css';

function secondsToMinSec(seconds) {
  let mins = Math.floor(seconds/60);
  seconds = seconds % 60;

  return `${mins} min ${seconds} s`;
}

export default function TimerTodo({
  todo,
  toggleCompleted,
  updateTimerTime,
}) {

  //handle toggling todo to be completed when the timer is at 0
  useEffect(() => {
    if (secondsLeft === 0 && !todo.completed) {
      toggleCompleted();
    }
  })

  const initialTime = Number(todo.seconds);

  let [secondsLeft, isStopped, toggleStopped] = useTimer(initialTime);

  let buttonControlText = isStopped ? 'Start' : 'Pause';
  
  function handleTimerButtonClick() {
    toggleStopped();
    if (!isStopped) {
      updateTimerTime(todo.id, secondsLeft);
    }
  }
  
  return (
    <li 
      key={todo.id} 
      className={todo.completed ? 'todo-item timer-todo completed ' : 'todo-item timer-todo'}
    >
      <div className='timer-todo-text'>
        { !todo.completed &&
          <input 
              type="checkbox" 
              id={`toggleCompleted-${todo.id}`}
              onChange={toggleCompleted}
              checked={todo.completed}
            />
        }
        <label 
          htmlFor={`toggleCompleted-${todo.id}`}
          className={todo.completed ? 'todo-text-completed' : ''}
        >
          {todo.completed ?
            `${todo.text} for ${todo.seconds/60} minutes` :
              todo.text
          }
        </label> 
      </div>
      
      <div className='timer-display-wrapper'>
        { !todo.completed &&
          <span>
              {secondsToMinSec(secondsLeft)}
          </span>
        }
        
        { !todo.completed &&
          <button
            onClick={handleTimerButtonClick}
          >
            {buttonControlText}
          </button>
        } 
          
        
      </div>        
    </li>
  )
}
import { useState, useRef, useEffect } from 'react';
import useTimer from '../hooks/useTimer.jsx';
import '../styles/Todo.css';

export default function TimerTodo({ todo, toggleCompleted, updateTimerTime }) {
  const [pageIsVisible, setPageIsVisible] = useState(true);

  /* The timer falls of sync when the application window is on the background in the user's browser.
      This is due to how browsers prioritize code execution and allocate resources to processes - it makes
      sense that tabs that are not 'active' are not prioritized. 

      To solve this, we track the visibilitychange event with state: when the application tab becomes unvisible,
      we stop the timer, and store a timestamp into a ref. When the tab becomes visible, we calculate the 
      time elapsed and set the secondsLeft state variable into the correct value.
    */
  let startTimeStamp = useRef(null);

  const initialTime = Number(todo.seconds);

  let [secondsLeft, updateTime, isStopped, toggleStopped] =
    useTimer(initialTime);

  console.log('pageIsVisible: ', pageIsVisible);

  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      setPageIsVisible(document.visibilityState === 'visible');
    });
  }, []);

  // if page is not visible and timer is on => stop the counter and take a timestamp
  if (!pageIsVisible && !isStopped) {
    console.log('page became unvisible. setting timestamp!');
    toggleStopped();
    startTimeStamp.current = Date.now();
  }

  useEffect(() => {
    // when the page becomes visible, update the secondsLeft accordingly
    if (pageIsVisible && startTimeStamp.current) {
      console.log('page is visible again, update the timer value!');
      let elapsedSeconds = Math.ceil(
        (Date.now() - startTimeStamp.current) / 1000
      );
      startTimeStamp.current = null;

      let updatedSecondsLeft = Math.max(secondsLeft - elapsedSeconds);
      updateTime(updatedSecondsLeft);
      updateTimerTime(todo.id, updatedSecondsLeft);
      toggleStopped();
    }
  }, [
    pageIsVisible,
    secondsLeft,
    todo.id,
    updateTime,
    toggleStopped,
    updateTimerTime,
  ]);

  //handle toggling todo to be completed when the timer is at 0
  useEffect(() => {
    if (secondsLeft === 0 && !todo.completed) {
      toggleCompleted();
    }
  });

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
      className={
        todo.completed
          ? 'todo-item timer-todo completed '
          : 'todo-item timer-todo'
      }
    >
      <div className="timer-todo-text">
        {!todo.completed && (
          <input
            type="checkbox"
            id={`toggleCompleted-${todo.id}`}
            onChange={toggleCompleted}
            checked={todo.completed}
          />
        )}
        <label
          htmlFor={`toggleCompleted-${todo.id}`}
          className={todo.completed ? 'todo-text-completed' : ''}
        >
          {todo.completed
            ? `${todo.text} for ${todo.seconds / 60} minutes`
            : todo.text}
        </label>
      </div>

      <div className="timer-display-wrapper">
        {!todo.completed && (
          <span>
            {`${Math.floor(secondsLeft / 60)}min ${secondsLeft % 60}s`}
          </span>
        )}

        {!todo.completed && (
          <button onClick={handleTimerButtonClick}>{buttonControlText}</button>
        )}
      </div>
    </li>
  );
}

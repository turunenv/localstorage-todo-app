import '../styles/AddTodoForm.css';

export default function AddTodoForm({
  todoText,
  handleTextChange,
  handleSubmit,
  isTimerTodo,
  timerTime,
  handleTodoTypeChange,
  handleTimerTimeChange,
}) {
  return (
    <div className="todo-form-wrapper">
      <div className="todo-type-selection">
        <button className="selected-todo-type" onClick={handleTodoTypeChange}>
          Normal
        </button>
        <button onClick={handleTodoTypeChange}>Timer</button>
      </div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="todo..."
          id="todo"
          value={todoText}
          onChange={handleTextChange}
        />

        {isTimerTodo && (
          <div className="timer-time-controls">
            <label htmlFor="timer-time">minutes</label>
            <input
              type="number"
              id="timer-time"
              value={timerTime}
              onChange={handleTimerTimeChange}
            ></input>
          </div>
        )}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

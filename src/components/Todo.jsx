import '../styles/Todo.css';

export default function Todo({ todo, toggleCompleted }) {
  return (
    <li
      key={todo.id}
      className={todo.completed ? 'todo-item completed' : 'todo-item'}
    >
      <div>
        <input
          type="checkbox"
          id={`toggleCompleted-${todo.id}`}
          onChange={toggleCompleted}
          checked={todo.completed}
        />
        <label
          htmlFor={`toggleCompleted-${todo.id}`}
          className={todo.completed ? 'todo-text-completed' : ''}
        >
          {todo.text}
        </label>
      </div>
    </li>
  );
}

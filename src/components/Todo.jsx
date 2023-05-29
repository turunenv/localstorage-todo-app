import '../styles/Todo.css';

export default function Todo({ todo, toggleCompleted }) {
  return (
    <li 
      key={todo.id} 
      className={todo.completed ? 'completed' : ''}
    >
      <label>
        <input 
          type="checkbox" 
          id={`toggleCompleted-${todo.id}`}
          onChange={toggleCompleted}
          checked={todo.completed}
        />
        {todo.text}
      </label>
      
    </li>
  )
}

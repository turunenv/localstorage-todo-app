import '../styles/Todo.css';

export default function Todo({ todo, toggleCompleted }) {
  return (
    <li 
      key={todo.id} 
      className={todo.completed ? 'completed' : ''}
    >
      <div>
        <input type="checkbox" id={`toggleCompleted-${todo.id}`}/>
        <label htmlFor={`toggleCompleted-${todo.id}`}>{todo.text}</label>
      </div>
    </li>
  )
}

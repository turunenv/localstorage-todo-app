import Todo from './Todo.jsx';
import '../styles/TodoList.css';

export default function TodoList({ todoList, toggleCompleted }) {

  return (
    <ul>
      {todoList.map((todo) => {
        return (
          <Todo 
            key={todo.id} 
            todo={todo} 
            toggleCompleted={() => toggleCompleted(todo.id)}
          />
        )
      })}
    </ul>
  );
}

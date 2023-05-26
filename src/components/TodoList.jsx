import Todo from './Todo.jsx';
import '../styles/TodoList.css';

export default function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}

import Todo from './Todo.jsx';
import TimerTodo from './TimerTodo.jsx';
import '../styles/TodoList.css';

export default function TodoList({ 
  todoList, 
  toggleCompleted, 
  updateTimerTime 
}) {
  return (
    <ul>
      {todoList.map((todo) => {
        if (todo.type === "normal") {
          return (
            <Todo 
              key={todo.id} 
              todo={todo} 
              toggleCompleted={() => toggleCompleted(todo.id)}
            />
          )
        }
        return (
          <TimerTodo 
            key={todo.id}
            todo={todo}
            updateTimerTime={updateTimerTime}
            toggleCompleted={() => toggleCompleted(todo.id)}
          />
        )
        
      })}
    </ul>
  );
}

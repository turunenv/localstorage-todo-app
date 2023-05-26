export default function AddTodoForm({ todoText, handleTextChange, handleSubmit }) {
  return (
    <form 
      className="todo-form"
      onSubmit={handleSubmit}
    >
      <input 
        type="text" 
        id="todo" 
        value={todoText}
        onChange={handleTextChange}
      />
      <button type="submit">Add</button>
    </form>
  )
}
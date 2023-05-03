import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    if (isEditing) {
      const editedTodo = todos.map((todo) =>
        todo.id === editId ? { ...todo, task: inputValue } : todo
      );
      setTodos(editedTodo);
      setInputValue('');
      setEditId(null);
      setIsEditing(false);
    } else {
      const newTodo = {
        id: Date.now(),
        task: inputValue,
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInputValue(todoToEdit.task);
    setEditId(id);
    setIsEditing(true);
  };

  const handleToggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className='App'>
      <h1>To-Do List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          placeholder='Add a new task'
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type='submit'>{isEditing ? 'Edit' : 'Add'}</button>
      </form>
      <ul className='todo-list'>
        {todos.map((todo) => (
          <li key={todo.id} className='todo-item'>
            <span
              className={`task ${todo.isCompleted ? 'completed' : ''}`}
              onClick={() => handleToggleCompletion(todo.id)}
>
{todo.task}
</span>
<div className='buttons'>
<button className='edit-button' onClick={() => handleEditTodo(todo.id)}>Edit</button>
<button className='delete-button' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
</div>
</li>
))}
</ul>
</div>
);
}

export default App;

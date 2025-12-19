import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Note: Vite uses App.css or index.css. You may need to update the filename here.
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // 1. Fetch data from Express Backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  // 2. Send data to Express Backend
  const addTodo = () => {
    axios.post('http://localhost:5000/api/todos', { text })
      .then(res => {
        setTodos([...todos, res.data]);
        setText("");
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      });
  };

  return (
    <div className="App">
      <h1>MERN Todo List</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text} 
            <button onClick={() => deleteTodo(todo._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
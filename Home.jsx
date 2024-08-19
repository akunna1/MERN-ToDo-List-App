import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Create from './Create';
import { BsFillTrashFill } from 'react-icons/bs'; // Import the trashcan icon

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleNewTodo = (newTodo) => {
    setTodos([...todos, newTodo]); // Update the state with the new todo
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        // Update the state to remove the deleted todo
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="home flex flex-col items-center p-4">
      <p className='text-2xl sm:text-4xl font-bold mb-5 mt-3'>Akunna's To Do List</p>
      <Create onNewTodo={handleNewTodo} />
      {todos.length === 0 ? (
        <div className="text-center">
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="todo-item  shadow-lg p-3 my-2 text-center sm:w-1/2 lg:w-1/3 flex items-center">
            <span className="flex-1 bg-white">{todo.task}</span>
            <BsFillTrashFill className='bg-white'
              onClick={() => handleDelete(todo._id)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;

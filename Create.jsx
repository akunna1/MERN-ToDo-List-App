import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ onNewTodo }) => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    axios.post('http://localhost:3001/add', { task: task })
      .then(result => {
        console.log(result);
        onNewTodo(result.data); // Pass the new todo back to Home for real-time update
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="create_form flex flex-col sm:flex-row items-center justify-center mb-4">
      <input 
        type="text" 
        placeholder="Enter Task" 
        onChange={(e) => setTask(e.target.value)} 
        className="w-full sm:w-auto sm:flex-1 p-2 mb-2 sm:mb-0"
      />
      <button 
        type="button" 
        onClick={handleAdd} 
        className="w-fit sm:w-auto py-2 px-4"
      >
        Add item
      </button>
    </div>
  );
};

export default Create;

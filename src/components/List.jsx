import React, { useState } from 'react';

const List = ({ title = "Task", streak = 0 }) => {
  // check if task is completed
  const [completed, setCompleted] = useState(JSON.parse(localStorage.getItem('completedTaskList')).some(t => t === title));
  // handle task check 
  const handleChange = (e) => {
    setCompleted(true);
    e.target.disabled = true;
    // add task to completed task list
    localStorage.setItem('completedTaskList', JSON.stringify([...JSON.parse(localStorage.getItem('completedTaskList')), title]));
  }
  return (
    <div className={`p-4 drop-shadow-xl shadow-lg text-lg border rounded flex font-bold items-center gap-4 ${completed ? "opacity-25" : ''}`}>
      <input type="checkbox" className='scale-125' onChange={handleChange} name="" id="" />
      <p className='text-sm'>{title}</p>
      <p className='ml-auto text-gray-600'>🔥 {streak}</p>
    </div>
  )
}

export default List

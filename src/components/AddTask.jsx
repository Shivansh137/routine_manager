import React, { useEffect, useRef } from 'react'

const AddTask = ({ setShow, setList, index }) => {
  // Reference for input
  const ref = useRef(null);
  // Focus the input field
  useEffect(() => {
    ref.current.focus();
  }, [])
  // Add the task
  const handleSubmit = () => {
    // fetch task list from local storage
    let clist = JSON.parse(localStorage.getItem('list'));
    // trim the input value
    let title = ref.current.value.trim();
    // check for empty value
    if (ref.current.value === "") alert("Enter a name");
    // check for repeated task
    else if (clist?.some(obj => obj.title.trim().toLowerCase() === title.toLowerCase())) alert("This Task already exists");
    else {
      // check if list is empty
      if (!clist) clist = [{ title, streak: 0 }];
      // insert task at the index
      else clist.splice(index, 0, { title, streak: 0 });
      // store list in localstorage
      localStorage.setItem('list', JSON.stringify(clist));
      // update the list and close the add task form
      setList(JSON.parse(localStorage.getItem('list')));
      setShow(false);
    }
  }

  return (
    <div className='w-screen h-screen  bg-black/50 fixed top-0 left-0 flex items-center justify-center'>
      <div className='bg-white px-8 py-6 space-y-4 rounded drop-shadow-2xl'>
        <p className='mb-4 font-bold border-b p-2 text-center'>Add Task</p>
        <input ref={ref} type="text" placeholder='Enter name' className='p-2 bg-gray-50 rounded outline-0' />
        <button onClick={handleSubmit} className='block bg-[#008080] w-full p-2 text-white font-bold rounded'>Add</button>
        <button onClick={() => { setShow(false) }} className='text-sm w-full text-gray-600'>Cancel</button>
      </div>
    </div>
  )
}

export default AddTask

import './App.css'
import List from './components/List'
import AddTask from './components/AddTask'
import { useEffect, useState } from 'react'
import { MdAdd, MdVerified } from 'react-icons/md'
import { BiSolidStar, BiStar } from 'react-icons/bi'

function App() {

  const [show, setShow] = useState(false);
  const [today, setToday] = useState(localStorage.getItem('today'));
  const [rating, setRating] = useState(localStorage.getItem('rating'));
  const [list, setList] = useState(JSON.parse(localStorage.getItem('list')));
  const [index, setIndex] = useState(list?.length);
  const [dayCompleted, setDayCompleted] = useState(JSON.parse(localStorage.getItem('dayCompleted')));

  useEffect(() => {
    if (!today || today < new Date().toLocaleDateString('en-CA')) {
      localStorage.setItem('today', new Date().toLocaleDateString('en-CA'));
      localStorage.setItem('completedTaskList', JSON.stringify([]));
      localStorage.setItem('dayCompleted', false);
      localStorage.setItem('rating', 0);
      setToday(localStorage.getItem('today'));
      setRating(localStorage.getItem('rating'));
      setDayCompleted(JSON.parse(localStorage.getItem('rating')));
    }
  }, []);

  useEffect(() => {
    setIndex(list?.length);
  }, [list]);

  const handleDayComplete = () => {
    setDayCompleted(true);
    localStorage.setItem('dayCompleted', true);

    let clist = JSON.parse(localStorage.getItem('list'));
    let arr = clist.map(task => {
      if (JSON.parse(localStorage.getItem('completedTaskList').includes(task.title))) {
        return { ...task, streak: task.streak + 1 }
      }
      return task;
    });
    localStorage.setItem('list', JSON.stringify(arr));
  }

  return (
    <>
      <div className='flex-col flex min-h-screen' >
        {/* header */}
        <div className=' text-center font-bold shadow-md sticky z-10 top-0 bg-[#008080] text-white p-4'>
          <p>📅 {new Date().toString().substring(0, 15)}</p>
        </div>
        {/* task list */}
        <div className='p-4 mt-4 flex flex-col grow'>
          {
            !dayCompleted && <>
              <p className='text-center mb-8 italic text-sm text-gray-600'>"Good Luck for today"</p>
              {
                list ? list.map((l, i) => (<div key={l.title} >
                  <MdAdd onClick={() => { setShow(true); setIndex(i) }} className=' mx-auto bg-[#008080]/20 w-full text-2xl p-1' />
                  <List title={l.title} streak={l.streak} />
                </div>
                )) : ""
              }
              <MdAdd onClick={() => { setShow(true); setIndex(list?.length) }} className=' mx-auto bg-[#008080]/20 w-full text-2xl p-1' />
              <button onClick={handleDayComplete} className='p-2 bg-[#008080] rounded w-full text-white mt-8 font-bold'>Finish the Day</button>
            </>
          }
          {
            dayCompleted ? <div className='p-4 flex flex-col grow'>
              <div className='bg-gray-50 mb-8 p-8 text-center space-y-6'>
                <p className='text-5xl'>👏</p>
                <p>Great Job !</p>
              </div>
              <p className='text-gray-700 font-bold text-center'>Rate your performance</p>
              <div className='flex justify-between mt-4 text-3xl'>
                {
                  Array.from({ length: 5 }, (e, i) => i).map(i => <button 
                   key={i}
                   onClick={() => { setRating(i + 1); localStorage.setItem('rating', i + 1) }}
                   className={`filter ${i <= rating - 1 ? '' : 'grayscale'}`}>
                  <BiSolidStar size={45} color='gold' />
                  </button>)
                }
              </div>
              <p className=' text-center mt-auto italic text-gray-500'>"Best Wishes for tomorrow"</p>
            </div> : ''
          }
        </div>
      </div>
      {show && <AddTask setShow={setShow} setList={setList} index={index} />}
    </>
  )
}

export default App

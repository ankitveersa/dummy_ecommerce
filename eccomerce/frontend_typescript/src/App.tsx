import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/commonComponents/NavBar'
import { MonthlyOrderCountContext } from './context/orders-count'
import { useState } from 'react';

function App() {
  const [monthlyOrderCount, setMonthlyOrderCount] = useState<number | null>(null);
  return (
    <>
    <MonthlyOrderCountContext.Provider value={{ monthlyOrderCount , setMonthlyOrderCount }}>
    <div className='bg-gray-300 min-h-screen'>
      <NavBar/>
      <Outlet />
    </div>
    </MonthlyOrderCountContext.Provider>
    </>
  )
}

export default App;

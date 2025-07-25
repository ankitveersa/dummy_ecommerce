import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/common/NavBar'

function App() {
  return (
    <>
    <div className='bg-gray-300 min-h-screen'>
      <NavBar/>
      <Outlet />
    </div>
    </>
  )
}

export default App;

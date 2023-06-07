import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthContextProvider } from './components/context/AuthContext'

function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <Navbar />
        <Outlet />
      </AuthContextProvider>
    </div>
  )
}

export default App

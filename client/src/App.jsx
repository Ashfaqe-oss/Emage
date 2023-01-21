import React from 'react'
import {Routes, Route, Link} from 'react-router-dom';
import {logo} from './assets';
import {Home, CreatePost} from './pages'

function App() {
  return (
    <div>
      <header className="w-full flex items-center justify-between px-4 sm:px-8 py-4 border-b border-b-[#1c1c24] ">
        <Link to="/">
          <img src={logo} alt="logo" className="w-10 object-contain" />
        </Link>
        <Link to="/create" className="bg-[#cc0000] font-inter font-medium  text-white px-4 py-2 rounded-md"> Create</Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
      </main>
      
    </div>
  )
}

export default App
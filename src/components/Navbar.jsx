import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { BsFillPencilFill } from 'react-icons/bs'
import { login } from '../api/firebase'

export default function Navbar() {
  return (
    // tailwind 적용 안됨 왜애럼 ?
    <header className='flex justify-between border-b p-3 border-gray-200'>
      <Link
        to='/'
        className='flex items-center text-4xl text-brand font-semibold'
      >
        <FiShoppingBag />
        <h2>Shoppy</h2>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>products</Link>
        <Link to='/carts'>carts</Link>
        <Link to='/products/new' className='text-2xl'>
          <BsFillPencilFill />
        </Link>
        <button onClick={() => login()}>Login</button>
      </nav>
    </header>
  )
}
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { BsFillPencilFill } from 'react-icons/bs'
import { login, logout, onUserStateChange } from '../api/firebase'
import User from './User'
import Button from './ui/Button'
import { useAuthContext } from './context/AuthContext'

export default function Navbar() {
  const { user, login, logout } = useAuthContext()
  return (
    <header className='flex justify-between border-b p-3 border-gray-200'>
      <Link
        to='/'
        className='flex items-center text-4xl text-brand font-semibold'
      >
        <FiShoppingBag />
        <h2>Shoppy</h2>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>상품</Link>
        {user && <Link to='/carts'>장바구니</Link>}
        {user && user.isAdmin && (
          <Link to='/products/new' className='text-2xl'>
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text='로그인' onClick={login} />}
        {user && <Button text='로그아웃' onClick={logout} />}
      </nav>
    </header>
  )
}

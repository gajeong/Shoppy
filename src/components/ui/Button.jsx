import React from 'react'

export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className='bg-brand py-2 px-4 rounded text-white hover:brightness-110'
    >
      {text}
    </button>
  )
}

import React, { useState } from 'react'
import Button from '../components/ui/Button'
import { uploadImage } from '../api/uploader'
import { addNewProduct } from '../api/firebase'

export default function NewProduct() {
  const [product, setProduct] = useState({})

  const [file, setFile] = useState()
  const [isUploading, setIsUploading] = useState(false)
  const [success, setSuccess] = useState('')
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'file') {
      setFile(files && files[0])
      return
    }
    setProduct((product) => ({ ...product, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsUploading(true)
    //제품의 사진을 cloudinary에 업로드 하고 url 획득
    // firebase에 새로운 제품을 추가함
    uploadImage(file)
      .then((url) => {
        setProduct((product) => ({ ...product, img: url }))
        addNewProduct(product).then(() => {
          setSuccess('성공적으로 제품이 추가되었습니다.')
          setFile(null)
          setProduct({})
          setTimeout(() => {
            setSuccess(null)
          }, 2000)
        })
      })
      .finally(() => setIsUploading(false))
  }
  return (
    <section className='flex justify-center'>
      <form
        className='grid gap-1 mt-4'
        onSubmit={handleSubmit}
      >
        <h1 className='text-center text-xl font-semibold'>
          새로운 제품 등록
        </h1>
        <div className='flex justify-center my-4'>
          {success && <p>❤️ {success}</p>}
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt='local file'
              className='w-36 h-64'
            />
          )}
        </div>
        <dl className='border p-2'>
          <input
            onChange={handleChange}
            type='file'
            name='file'
            accept='image/*'
            className='block'
            required
          ></input>
        </dl>
        <dl className='border p-2'>
          <input
            onChange={handleChange}
            type='text'
            name='productNm'
            value={
              product.productNm ? product.productNm : ''
            }
            placeholder='상품명'
            required
            className='block w-full focus:outline-none'
          />
        </dl>
        <dl className='border p-2'>
          <input
            onChange={handleChange}
            type='text'
            name='price'
            value={product.price ? product.price : ''}
            placeholder='가격'
            required
            className='block w-full focus:outline-none'
          />
        </dl>
        <dl className='border p-2'>
          <input
            onChange={handleChange}
            type='text'
            name='options'
            value={product.options ? product.options : ''}
            placeholder='분류'
            required
            className='block w-full focus:outline-none'
          />
        </dl>
        <dl className='border p-2'>
          <input
            onChange={handleChange}
            type='text'
            name='detail'
            value={product.detail ? product.detail : ''}
            placeholder='설명'
            required
            className='block w-full focus:outline-none'
          />
        </dl>
        <dl className='border p-2'>
          <input
            onChange={handleChange}
            type='text'
            name='size'
            value={product.size ? product.size : ''}
            placeholder='사이즈 분류'
            required
            className='block w-full focus:outline-none'
          />
        </dl>
        <Button
          text={isUploading ? '업로드중' : '제품 등록하기'}
          disabled={isUploading}
        />
      </form>
    </section>
  )
}

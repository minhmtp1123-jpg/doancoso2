import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItems = ({ id, image, name, price }) => {

  const { currency } = useContext(ShopContext);

  const handleClick = () => {
    window.location.href = `/product/${id}`;
  }

  return (
    <div className='text-gray-700 cusor-pointer ' onClick={handleClick}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image && image[0] ? image[0] : ''} alt="" />
      </div>
      <p className='pt-3 text-sm'>
        {name}
      </p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </div>
  )
}

export default ProductItems
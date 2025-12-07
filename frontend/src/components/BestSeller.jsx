import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react';
import Title from './Title';
import ProductItems from './ProductItems';

const BestSeller = () => {

  const { products } = useContext(ShopContext);
  const [bestSeller, setbestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = Array.isArray(products) ? products.filter((item) => item && item.bestseller) : [];
    setbestSeller(bestProduct.slice(0, 5));
    console.log("Best Seller Products:", bestProduct);
  }, [products])



  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At libero asperiores quam officiis. Quo, ipsum fugit nobis nesciunt explicabo perferendis.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          bestSeller.map((item) => (
            <ProductItems key={item._id} id={item._id} image={item.images || []} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller
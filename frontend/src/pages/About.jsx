import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta accusamus vel animi, laborum optio quidem?</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum est maiores magnam alias doloribus? Necessitatibus officia debitis mollitia ab doloribus suscipit? Rerum incidunt deleniti tempore consequatur atque placeat facere ea!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga similique, optio magnam quaerat vero atque nulla minus rem a distinctio doloremque, eum dignissimos obcaecati expedita beatae. Reprehenderit at reiciendis aliquam.</p>
        </div>
      </div>
      
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-m mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-'gray-600>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit placeat doloremque quidem explicabo quos? Esse, repellendus sint veritatis accusantium necessitatibus beatae commodi veniam officia facilis.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-'gray-600>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit placeat doloremque quidem explicabo quos? Esse, repellendus sint veritatis accusantium necessitatibus beatae commodi veniam officia facilis.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-'gray-600>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit placeat doloremque quidem explicabo quos? Esse, repellendus sint veritatis accusantium necessitatibus beatae commodi veniam officia facilis.</p>
        </div>

      </div>

      <NewsletterBox/>

    </div>
  )
}

export default About
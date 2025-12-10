import React, { useState, useEffect } from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
    const heroImages = [
        assets.hero_img,
        assets.p_img11,
        assets.p_img12
    ]

    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                if (prevIndex === heroImages.length - 1) {
                    return 0
                } else {
                    return prevIndex + 1
                }
            })
        }, 3000)

        return () => clearInterval(interval)
    }, [heroImages.length])

    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* Left Section - GIỮ NGUYÊN */}
            <div className='w-full items-center sm:w-1/2 flex justify-center py-10 sm:py-0'>
                <div className='text-[#41414]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>OUT BEST SELLER</p>
                    </div>
                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Lasted Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>

            {/* Right Section - ĐIỀU CHỈNH CSS ĐỂ ĐỒNG NHẤT KÍCH THƯỚC */}
            <div className='w-full sm:w-1/2 relative overflow-hidden'>
                {/* Thêm wrapper để fix kích thước */}
                <div className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]'>
                    <img
                        className='w-full h-full object-cover'
                        src={heroImages[currentImageIndex]}
                        alt=""
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                    />
                </div>

                {/* Dots indicator (tùy chọn) */}
                <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
                    {heroImages.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full cursor-pointer ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                            onClick={() => setCurrentImageIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Hero
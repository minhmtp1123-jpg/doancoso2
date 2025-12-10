import React, { useContext } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, Links, NavLink } from 'react-router-dom'
import '../index.css'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const { setShowsearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token');
        setToken('');
        setCartItems({})


    }

    return (



        <div className='flex items-center justify-between py-5 font-medium'>

            <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

                <NavLink to='/' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`}>
                    <p>HOME</p>
                    <hr className='nav-underline w-2/4 border-none h-[1.5px] bg-gray-700' />
                </NavLink>

                <NavLink to='/collection' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`}>
                    <p>COLLECTION</p>
                    <hr className='nav-underline w-2/4 border-none h-[1.5px] bg-gray-700' />
                </NavLink>

                <NavLink to='/about' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`}>
                    <p>ABOUT</p>
                    <hr className='nav-underline w-2/4 border-none h-[1.5px] bg-gray-700' />
                </NavLink>

                <NavLink to='/contact' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`}>
                    <p>CONTACT</p>
                    <hr className='nav-underline w-2/4 border-none h-[1.5px] bg-gray-700' />
                </NavLink>

            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={() => setShowsearch(true)} className='w-5 cusor-pointer' src={assets.search_icon} alt="" />
                <div className='group relative'>

                    <img onClick={() => token ? null : navigate('/login')} className='w-5 cusor-pointer' src={assets.profile_icon} alt="" />

                    {/**         Dropdown Menu               **/}

                    {
                        token &&
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p className='cusor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cusor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cusor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }

                </div>
                <Link to='/cart' className='relative'>
                    <img className='w-5 min-w-5' src={assets.cart_icon} alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cusor-pointer sm-hidden' alt="" />
            </div >
            {/* Sidebar menu */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>

                </div>
            </div >
        </div >

    )
}

export default Navbar
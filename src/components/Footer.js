import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';


const Footer = memo(() => {
    return (
        <div className='text-white h-[calc(100vh-7rem)] bg-sky-950'>
            <div className=' child:mt-12  max-w-[80%] mx-auto  flex justify-between '>
                <div>
                    <img className=' mb-5' src='../../media/logo/logo.png.webp' alt='logo' />
                    <span className=' w-72 block text-slate-300'>Lorem iaspsum doldfor sit amvset, consectetur adipisicing cvelit csed do eiusmod tempor incididucvccnt ut labovre.</span>
                </div>
                <div className=''>
                    <h4 className='text-xl font-semibold mb-8 capitalize font-Barlow-Regular'>Quick Links</h4>
                    <nav>
                        <nav className=' block  child:block font-extralight text-slate-300 child:mb-6 '>
                            <NavLink className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer' exact='true' to='/home'>
                                <h3>HOME</h3>
                            </NavLink>
                            <NavLink className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer' exact='true' to='/about'>
                                <h3>ABOUT US</h3>
                            </NavLink>
                            <NavLink className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer' exact='true' to='/package'>
                                <h3>PACKAGE</h3>
                            </NavLink>
                            <NavLink className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer' exact='true' to='/blog'>
                                <h3>BLOG</h3>
                            </NavLink>
                            <li class="relative group list-none">
                                <NavLink className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer' exact='true' class="text-black hover:text-[#264247]" to='/pages'>
                                    <h3>PAGES</h3>
                                </NavLink>
                                {/* <a  class="text-black hover:text-[#264247]">PAGES</a> */}
                                <ul class=" z-50 absolute border-t-[5px] w-[8rem] border-[#014b85] top-[69px] hidden space-y-2  group-hover:block child:ml-2 list-none">
                                    <li><NavLink exact='true' to='/'>Submenu 1</NavLink></li>
                                    <li><NavLink exact='true' to='/'>Submenu 2</NavLink></li>
                                    <li><NavLink exact='true' to='/'>Submenu 3</NavLink></li>
                                </ul>
                            </li>
                            <NavLink exact='true' to='/contact'>CONTACT US</NavLink>
                        </nav>
                    </nav>
                </div>
                <div className=' child:block'>
                    <h4 className=' text-xl font-semibold mb-8 capitalize font-Barlow-Regular'>New Foods</h4>
                    <ul className='child:font-extralight text-slate-300 child:mb-6 '>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer'>fish</li>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer'>kabab</li>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer'>pizza</li>
                    </ul>               
                </div>
                <div className='child:block'>
                    <h4 className=' text-xl font-semibold mb-8 capitalize font-Barlow-Regular '>Support</h4>
                    <ul className='child:font-extralight text-slate-300 child:mb-6'>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer'>Frequently Asked Questions</li>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer'>Terms & Conditions</li>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer'>Privacy Policy</li>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer'>Report a Payment Issue</li>
                    </ul>
                
                </div>
            </div>
        </div>
    );
});

export default Footer;
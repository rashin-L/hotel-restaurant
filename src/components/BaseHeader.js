import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';

const BaseHeader = () => {
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    const isSticky = (e) => {
        const header = document.querySelector('#base_header');
        const scrollTop = window.scrollY;
        scrollTop >= 25 ? header.classList.add('fixed', 'top-0') : header.classList.remove('is-sticky');
        scrollTop <= 25 ? header.classList.remove('fixed', 'top-0') : header.classList.remove('is-sticky');
    };
    
    return (
        <div id='base_header' className=' h-20  w-full bg-white shadow-2xl z-50'>
            <div className=' pt-4  text-black max-w-[80%] m-auto  flex justify-between align-baseline items-center'>
                <div>
                    <img src='../../media/logo/logo.png.webp' alt='logo' />
                </div>
                <div>
                    <nav>
                        <nav className='  flex items-center gap-7 child:font-Barlow-Regular font-semibold text-[16px] text-[#264247] '>
                            <NavLink exact='true' to='/'>
                                <h3>HOME</h3>
                            </NavLink>
                            <NavLink exact='true' to='/rooms'>
                                <h3>Rooms</h3>
                            </NavLink>
                            <NavLink exact='true' to='/foods'>
                                <h3>Foods</h3>
                            </NavLink>
                            <NavLink exact='true' to='/blog'>
                                <h3>BLOG</h3>
                            </NavLink>
                            <li class="relative group list-none">
                                <NavLink exact='true' class="text-black mb-[69px] hover:text-[#264247]" to='/pages'>
                                    <h3>PAGES</h3>
                                </NavLink>
                                <ul class=" pt-[1.5rem] z-50 absolute  w-[8rem]   hidden space-y-4  group-hover:block child:list-none text-center  mb-4 bg-white
                                [&>*:first-child]:w-[8rem] [&>*:first-child]:pt-8 [&>*:first-child]:border-[#014b85] [&>*:first-child]:border-t-[5px] [&>*:last-child]:pb-8">
                                    <li><NavLink exact='true' to='/'>Submenu 1</NavLink></li>
                                    <li><NavLink exact='true' to='/'>Submenu 2</NavLink></li>
                                    <li><NavLink exact='true' to='/'>Submenu 3</NavLink></li>
                                </ul>
                            </li>
                            <NavLink exact='true' to='/contact'>CONTACT US</NavLink>
                        </nav>
                    </nav>
                </div>

            </div>
        </div>

    );
};

export default BaseHeader;
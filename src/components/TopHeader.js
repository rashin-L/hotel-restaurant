import React, { useState, useEffect } from 'react';
import { BiLogoPinterestAlt, BiLogoFacebook, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useLogoutUserQuery } from '../redux/services/auth/logoutAPI';
import Swal from 'sweetalert2';


const TopHeader = () => {
    const { refetch } = useLogoutUserQuery();
    const [isTwitterHovered, setIsTwitterHovered] = useState(false);
    const [isLinkedinHovered, setIsLinkedinHovered] = useState(false);
    const [isFacebookHovered, setIsFacebookHovered] = useState(false);
    const [isPinterestHovered, setIsPinterestHovered] = useState(false);
    const [user, setUser] = useState(null);

    const handleTwitterHover = () => {
        setIsTwitterHovered(!isTwitterHovered);
    };

    const handleLinkedinHover = () => {
        setIsLinkedinHovered(!isLinkedinHovered);
    };

    const handleFacebookHover = () => {
        setIsFacebookHovered(!isFacebookHovered);
    };

    const handlePinterestHover = () => {
        setIsPinterestHovered(!isPinterestHovered);
    };

    const innerStyle = {
        animation: 'flip 1s ',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.7s ease-in-out',
    };

    useEffect(() => {
        const storedData = localStorage.getItem('user');
        const parsedData = JSON.parse(storedData);
        setUser(parsedData);
    }, []);



    const logoutHandle = () => {
        refetch();
        localStorage.removeItem('user');
        setUser(null);
        Swal.fire({
            icon: 'success',
            text: "You have logout successfully",
        })
    }

    return (
        <>
            <div className="  bg-slate-900 ">
                <div className='max-w-[80%] m-auto h-14 flex justify-between align-middle items-center'>
                    <div className='flex font-Barlow-Regular text-sm child:cursor-pointer text-gray-50 align-middle items-center gap-7'>

                        {user
                            ? (<li class="relative group list-none">
                                <NavLink exact='true' class="text-black mb-[69px] hover:text-[#264247]" >
                                    <h3>{user.name} {user.family}</h3>
                                </NavLink>
                                {/* <a  class="text-black hover:text-[#264247]">PAGES</a> */}
                                <ul class=" bg-slate-900 pt-[0.8rem] z-50 absolute  w-[8rem]   hidden space-y-4  group-hover:block child:list-none text-center  mb-4 
                                [&>*:first-child]:w-[8rem] [&>*:first-child]:pt-8 [&>*:first-child]:border-[#c7cacf] [&>*:first-child]:border-t-[5px] [&>*:last-child]:pb-8">
                                    <li><NavLink exact='true' to='/user-panel'>User Panel</NavLink></li>
                                    <li><NavLink exact='true' to='/cart'>Cart</NavLink></li>
                                    <li className=' cursor-pointer' onClick={logoutHandle}>Log Out</li>

                                </ul>
                            </li>)
                            : (<>
                                <Link to='./register'>Register</Link>
                                <Link to='./login'>Login</Link>
                            </>)

                        }


                    </div>

                    <div className='flex  items-center gap-4  child-hover:animate-spin cursor-pointer text-gray-50 align-middle  child-hover:text-[#fd7e14]'>
                        <div
                            style={isTwitterHovered ? innerStyle : {}}
                            onMouseEnter={handleTwitterHover}
                            onMouseLeave={handleTwitterHover}
                        >
                            <BiLogoTwitter />
                        </div>
                        <div
                            style={isLinkedinHovered ? innerStyle : {}}
                            onMouseEnter={handleLinkedinHover}
                            onMouseLeave={handleLinkedinHover}
                        >
                            <BiLogoLinkedin />
                        </div>
                        <div
                            style={isFacebookHovered ? innerStyle : {}}
                            onMouseEnter={handleFacebookHover}
                            onMouseLeave={handleFacebookHover}
                        >
                            <BiLogoFacebook />
                        </div>
                        <div
                            style={isPinterestHovered ? innerStyle : {}}
                            onMouseEnter={handlePinterestHover}
                            onMouseLeave={handlePinterestHover}
                        >
                            <BiLogoPinterestAlt />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopHeader;
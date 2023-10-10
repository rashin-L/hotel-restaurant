
import { useGetFoodQuery } from '../../redux/services/foods/foodAPI ';
import { useGetFoodTypesQuery } from '../../redux/services/foods/foodTypesAPI';
import { useAddOrderMutation } from '../../redux/services/foods/orderAPI';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slide from 'react-reveal/Slide';
import { useState } from 'react';
import queryString from 'query-string';
import Food from '../../components/Food';
import React from 'react';

const Foods = ({user}) => {
    const { data: foods, isError, error, isLoading } = useGetFoodQuery();
    const { data: foodTypes, } = useGetFoodTypesQuery();
    const [addOrder] = useAddOrderMutation();
    const [isShownId, setIsShownId] = useState(false)
    const [mystyle, setmystyle] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState('')


    const openModal = (food) => {
        setIsModalOpen(true);
        setSelectedFood(food);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {

        return <div>Error: {error.message}{console.log(error.status)}{console.log(foods)}</div>


    }
    const addToOrder = async (id) => {
        if (user) {
            const userId = user.user.id;
            console.log(userId)
        }
        const userId = 1;
        


        try {
            const payload = await addOrder(queryString.stringify({
                foods_number: 1,
                Client: userId,
                food: id,
            }))
            console.log('fulfilled', payload);
            console.log('order successful:', payload.data);
        } catch (error) {
            console.log('order error:', error);
            console.log('Raw response:', error.response);
        }

    }
    const handleClick = (id) => {
        setIsModalOpen(false);
        setIsShownId(id);
        setmystyle(prevstate => ({
            ...mystyle,
            [id]: !prevstate[id]
        }))
    };

    return (
        <div className='font-Barlow-Regular'>
            <h1 className='max-w-[80%] h-auto  m-auto mb-10 '>RESTAURANT MENU</h1>
            <div className='max-w-[80%] h-auto  m-auto mb-20 flex flex-wrap justify-between align-middle items-center'>
                {foodTypes && foodTypes.map((type, i) => (
                    <div key={type.id}>
                        <div key={type.id} className=' flex flex-wrap align-middle justify-center items-center '>
                            <div
                                onClick={() => {
                                    handleClick(type.id);
                                }} className='  z-10  order-2 cursor-pointer'>
                                <img
                                    className={`mr-3 rounded-full w-[20rem] h-[20rem]   border-4  ${isShownId === type.id ? "border-y-red-600 border-x-amber-400" : "border-amber-400"}`}
                                    src={`http://127.0.0.1:8000${type.food_img}`}
                                    alt="img"
                                />
                            </div>
                            {isShownId === type.id &&
                                <div
                                    className={`overflow-x-hidden ${i % 2 === 0 ? "order-2" : "order-1"}`}>
                                    <Slide left={i % 2 === 0} right={i % 2 !== 0}>
                                        <div className='  block '>
                                            {type.foods_type?.map((food) => (
                                                <div className='mt-4 '>
                                                    <div className='' key={food.id}>
                                                        <h2 className=' text-lg font-bold'>{food.name}</h2>
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <div>
                                                            {food.food_content && food.food_content.map((content, index) => (
                                                                <h2 key={content.name} className=' inline'>
                                                                    {content.name}
                                                                    {index !== food.food_content.length - 1 && ','}
                                                                </h2>
                                                            ))}
                                                        </div>
                                                        <hr className=' border-gray-600 mt-4 border-dashed h-1 w-40 mx-3' />
                                                        <div className='flex child:mr-2 items-center'>
                                                            <h2>{food.price}$</h2>
                                                            {user.user &&
                                                                <svg className=' w-8 h-8 cursor-pointer' onClick={() => addToOrder(food.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="food-delivery"><path d="M283.3 82.8c-7.6-7-17.6-10.8-28.1-10.8-22.1 0-40 16.9-40 37.8v5.9c-47 8.1-89.8 30.1-124.1 64.3-42.2 42.3-66 97.8-67.8 157.1-5.5 1.4-10.6 4.2-14.8 8.3-6.1 6-9.4 14.1-9.4 22.6 0 17.6 14.4 32 32 32h214.2c.3.3.5.6.8.9 4.5 4.6 10.5 7.1 17 7.1h17.5c-.9 2.5-1.5 5.2-1.5 8 0 6.5 2.5 12.5 7 16.9 4.5 4.6 10.5 7.1 17 7.1h71.3c6.8 0 13.4-1.2 19.7-3.5l47.6-17.9c4.6-1.7 9.3-2.5 14.1-2.5h47.3c4.4 0 8-3.6 8-8v-88c0-4.4-3.6-8-8-8h-18.4c-13.8-99.8-90.3-179.1-189.6-196.4v-5.8c.1-10.2-4.2-20-11.8-27.1zM495.2 400h-39.3c-6.7 0-13.3 1.2-19.7 3.5l-47.7 17.9c-4.4 1.7-9.3 2.5-14.1 2.5h-71.3c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-4.4 3.6-8 8-8h48c4.4 0 8-3.6 8-8s-3.6-8-8-8h-88c-2.1 0-4.1-.8-5.9-2.6-.3-.3-.7-.8-1.1-1.5-.7-1.2-1.1-2.6-1.1-4 0-4.4 3.6-8 8-8h88c4.4 0 8-3.6 8-8s-3.6-8-8-8H247c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-1.4.4-2.8 1.1-4 1.5-2.5 4.1-4 6.9-4h104c4.4 0 8-3.6 8-8s-3.6-8-8-8h-72c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-4.4 3.6-8 8-8h112c.2 0 .4-.1.5-.1.5 0 1-.2 1.5-.3.5-.1 1-.3 1.5-.5.2-.1.4-.1.5-.2.3-.2.4-.4.7-.6.4-.3.8-.7 1.2-1.1.3-.4.6-.8.8-1.2.3-.4.5-.9.6-1.4.2-.5.3-1 .3-1.6 0-.3.2-.6.2-.9 0-.2-.1-.3-.1-.5 0-.5-.2-1-.3-1.6-.1-.5-.3-1-.5-1.5-.1-.2-.1-.4-.2-.5l-13.6-22.7c-1.7-2.9-2.6-5.9-2.6-9.2 0-4.8 1.8-9.2 5.1-12.5 1.1-1 2.4-1.6 3.9-1.5.8 0 2.3.3 3.5 1.7l58 64.5c4.5 5 11.1 7.9 17.9 7.9h24.9v72zm-26.6-88.4c-1.6-.4-3.1-1-4.2-2.3l-58-64.4c-3.8-4.3-9.1-6.8-14.9-7-5.8-.3-11.5 2-15.7 6.2-6.4 6.4-9.9 14.8-9.9 23.9 0 6.1 1.7 12.1 4.8 17.4l6.4 10.6h-97.9c-13.2 0-24 10.8-24 24 0 2.8.6 5.5 1.4 8h-9.4c-6.9 0-13.2 3-17.7 8H39.4c2-54.6 24.2-105.8 63.1-144.7 33.4-33.4 75.6-54.5 121.3-61l31.4-2.3c10.2 0 20.3.7 30.9 2.2 94.7 13.6 168.4 87.6 182.5 181.4z"></path></svg>
                                                            }
                                                            <div onClick={() => openModal(food)} className=' cursor-pointer bg-orange-400 p-2 rounded-lg shadow-md' >Detail</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Slide></div>
                            }
                        </div>
                    </div>
                ))}
            </div>
            <div className=' relative'>
                {/* 0000000 */}
                <div onClose={closeModal}>
                    {isModalOpen && (
                        <Food food={selectedFood} addToOrder={addToOrder}>
                            <button
                                className="absolute right-32 text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button></Food>

                        // <div className=" font-Chalk text-stone-100 fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
                        //     <div className=" absolute top-10  rounded-lg p-6 w-[62rem] h-[32rem]">
                        //         <div className='bg-food-pattern absolute top-10 child:ml-36 mt-[2rem] float-right  w-[52rem] h-auto rounded-lg'>
                        //             <h2 className=' text-xl '>{selectedFood.description}</h2>
                        //             <div className='flex justify-between align-top'>
                        //                 <div>
                        //                     <span className=' text-2xl'>CONTENT:</span>
                        //                     {selectedFood.food_content && selectedFood.food_content.map((content, index) => (
                        //                         <h2 key={content.name} className=''>
                        //                             <div className=' flex justify-start gap-10 child:text-lg'>
                        //                                 <span className=''>{content.name}</span>
                        //                                 <span>{content.grams_weight} gr</span>
                        //                             </div>
                        //                         </h2>
                        //                     ))}
                        //                 </div>
                        //                 <div>
                        //                     <h5 className=' text-3xl mr-10'>Price: {selectedFood.price} $</h5>
                        //                     <svg className=' bg-slate-200 w-8 h-8 cursor-pointer' onClick={() => addToOrder(selectedFood.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="food-delivery"><path d="M283.3 82.8c-7.6-7-17.6-10.8-28.1-10.8-22.1 0-40 16.9-40 37.8v5.9c-47 8.1-89.8 30.1-124.1 64.3-42.2 42.3-66 97.8-67.8 157.1-5.5 1.4-10.6 4.2-14.8 8.3-6.1 6-9.4 14.1-9.4 22.6 0 17.6 14.4 32 32 32h214.2c.3.3.5.6.8.9 4.5 4.6 10.5 7.1 17 7.1h17.5c-.9 2.5-1.5 5.2-1.5 8 0 6.5 2.5 12.5 7 16.9 4.5 4.6 10.5 7.1 17 7.1h71.3c6.8 0 13.4-1.2 19.7-3.5l47.6-17.9c4.6-1.7 9.3-2.5 14.1-2.5h47.3c4.4 0 8-3.6 8-8v-88c0-4.4-3.6-8-8-8h-18.4c-13.8-99.8-90.3-179.1-189.6-196.4v-5.8c.1-10.2-4.2-20-11.8-27.1zM495.2 400h-39.3c-6.7 0-13.3 1.2-19.7 3.5l-47.7 17.9c-4.4 1.7-9.3 2.5-14.1 2.5h-71.3c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-4.4 3.6-8 8-8h48c4.4 0 8-3.6 8-8s-3.6-8-8-8h-88c-2.1 0-4.1-.8-5.9-2.6-.3-.3-.7-.8-1.1-1.5-.7-1.2-1.1-2.6-1.1-4 0-4.4 3.6-8 8-8h88c4.4 0 8-3.6 8-8s-3.6-8-8-8H247c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-1.4.4-2.8 1.1-4 1.5-2.5 4.1-4 6.9-4h104c4.4 0 8-3.6 8-8s-3.6-8-8-8h-72c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-4.4 3.6-8 8-8h112c.2 0 .4-.1.5-.1.5 0 1-.2 1.5-.3.5-.1 1-.3 1.5-.5.2-.1.4-.1.5-.2.3-.2.4-.4.7-.6.4-.3.8-.7 1.2-1.1.3-.4.6-.8.8-1.2.3-.4.5-.9.6-1.4.2-.5.3-1 .3-1.6 0-.3.2-.6.2-.9 0-.2-.1-.3-.1-.5 0-.5-.2-1-.3-1.6-.1-.5-.3-1-.5-1.5-.1-.2-.1-.4-.2-.5l-13.6-22.7c-1.7-2.9-2.6-5.9-2.6-9.2 0-4.8 1.8-9.2 5.1-12.5 1.1-1 2.4-1.6 3.9-1.5.8 0 2.3.3 3.5 1.7l58 64.5c4.5 5 11.1 7.9 17.9 7.9h24.9v72zm-26.6-88.4c-1.6-.4-3.1-1-4.2-2.3l-58-64.4c-3.8-4.3-9.1-6.8-14.9-7-5.8-.3-11.5 2-15.7 6.2-6.4 6.4-9.9 14.8-9.9 23.9 0 6.1 1.7 12.1 4.8 17.4l6.4 10.6h-97.9c-13.2 0-24 10.8-24 24 0 2.8.6 5.5 1.4 8h-9.4c-6.9 0-13.2 3-17.7 8H39.4c2-54.6 24.2-105.8 63.1-144.7 33.4-33.4 75.6-54.5 121.3-61l31.4-2.3c10.2 0 20.3.7 30.9 2.2 94.7 13.6 168.4 87.6 182.5 181.4z"></path></svg>

                        //                 </div>

                        //             </div>
                        //         </div>

                        //         <div className='flex items-start  top-[5.5rem] absolute'>
                        //             <div className='relative top-[-7rem] left-[-7rem]'>
                        //                 <img className='  w-60 h-60 rounded-full shadow-xl'
                        //                     src={`http://127.0.0.1:8000${selectedFood.food_img}`} alt={selectedFood.name}></img>
                        //                 <div className=" bg-red_paint w-[15rem] h-[10rem] bg-contain bg-no-repeat rounded-lg  text-center text-slate-800 text-3xl font-bold mb-4">

                        //                     <span className=' pt-3 block'>{selectedFood.name}</span>
                        //                 </div>

                        //             </div>

                        //         </div>

                        //         <button
                        //             className="absolute right-32 text-gray-500 hover:text-gray-700"
                        //             onClick={closeModal}
                        //         >
                        //             <svg
                        //                 xmlns="http://www.w3.org/2000/svg"
                        //                 className="h-6 w-6"
                        //                 fill="none"
                        //                 viewBox="0 0 24 24"
                        //                 stroke="currentColor"
                        //             >
                        //                 <path
                        //                     strokeLinecap="round"
                        //                     strokeLinejoin="round"
                        //                     strokeWidth={2}
                        //                     d="M6 18L18 6M6 6l12 12"
                        //                 />
                        //             </svg>
                        //         </button>
                        //     </div>
                        // </div>
                    )}

                </div>
            </div>


        </div >
    )
};



export default Foods;
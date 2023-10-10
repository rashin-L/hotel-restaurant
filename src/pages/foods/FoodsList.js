import React, {useState, useEffect} from 'react';
// import Food from '../../components/Food';
import { useGetFoodQuery } from '../../redux/services/foods/foodAPI ';
import { useAddOrderMutation } from '../../redux/services/foods/orderAPI';
// import CurrentUser from '../../CurrentUserr';
import queryString from 'query-string';


function FoodsList(user) {
    const { data: foods } = useGetFoodQuery();
    const [addOrder] = useAddOrderMutation();
    const [records, setRecords] = useState([]);

    const [recordsbool, setRecordsbool] = useState(false);
    const [filters, setFilters] = useState({
        filterName: '',
        filterPrice: '',
        filterBeds: ''
    });
    useEffect(() => {
        const { filterName } = filters;

        let filteredFood = (foods ?? []).filter((food) => {
            
            return food.name.toLowerCase().includes(filterName.toLowerCase())
        });
        
        
        setRecords(filteredFood);
        setRecordsbool(true);
    }, [filters, foods, records])


    const changeHandler = (event) => {
        let filterName = event.target.value;
        setFilters((prevFilters) => ({ ...prevFilters, filterName }));
        return filterName;
    };
    const addToOrder = async (id) => {
        const userId = user.user.id;
        console.log(userId)

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

    return (
        <div>
            <div className='max-w-[80%] m-auto  flex justify-start mt-7 mb-2'>
                    <div class=" p-2 w-[-webkit-fill-available] fill-ava flex  justify-between items-center j bg-[#004d7f] rounded-md">
                        <div className='flex justify-between align-top'>
                            <div class="pl-2 bg-[#004d7f]">
                                <svg class="fill-current  text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path class="heroicon-ui"
                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                </svg>
                            </div>
                            <input
                                class=" w-80 rounded-md bg-[#004d7f] text-white leading-tight focus:outline-none py-2 px-2"
                                id="search" type="text" placeholder="Search Room" onChange={changeHandler} value={filters.filterName} />
                        </div>

                    </div>
                </div>

                {recordsbool
                ?(records && records.map((food) => (
                
                
                    <div className=" font-Chalk text-stone-100   flex items-center justify-center ">
                    <div className="  top-10  rounded-lg p-6 w-[62rem]">
                        <div className=' h-60 flex flex-col justify-center bg-food-pattern   child:ml-36  float-right  w-[52rem]  rounded-lg'>
                            <h2 className=' text-xl '>{food.description}</h2>
                            <div className='flex justify-between align-top '>
                                <div>
                                    <span className=' text-2xl'>CONTENT:</span>
                                    {food.food_content && food.food_content.map((content, index) => (
                                        <h2 key={content.name} className=''>
                                            <div className=' flex justify-start gap-10 child:text-lg'>
                                                <span className=''>{content.name}</span>
                                                <span>{content.grams_weight} gr</span>
                                            </div>
                                        </h2>
                                    ))}
                                </div>
                                <div>
                                    <h5 className=' text-3xl mr-10'>Price: {food.price} $</h5>
                                    <svg className=' bg-slate-200 w-8 h-8 cursor-pointer' onClick={() => addToOrder(food.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="food-delivery"><path d="M283.3 82.8c-7.6-7-17.6-10.8-28.1-10.8-22.1 0-40 16.9-40 37.8v5.9c-47 8.1-89.8 30.1-124.1 64.3-42.2 42.3-66 97.8-67.8 157.1-5.5 1.4-10.6 4.2-14.8 8.3-6.1 6-9.4 14.1-9.4 22.6 0 17.6 14.4 32 32 32h214.2c.3.3.5.6.8.9 4.5 4.6 10.5 7.1 17 7.1h17.5c-.9 2.5-1.5 5.2-1.5 8 0 6.5 2.5 12.5 7 16.9 4.5 4.6 10.5 7.1 17 7.1h71.3c6.8 0 13.4-1.2 19.7-3.5l47.6-17.9c4.6-1.7 9.3-2.5 14.1-2.5h47.3c4.4 0 8-3.6 8-8v-88c0-4.4-3.6-8-8-8h-18.4c-13.8-99.8-90.3-179.1-189.6-196.4v-5.8c.1-10.2-4.2-20-11.8-27.1zM495.2 400h-39.3c-6.7 0-13.3 1.2-19.7 3.5l-47.7 17.9c-4.4 1.7-9.3 2.5-14.1 2.5h-71.3c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-4.4 3.6-8 8-8h48c4.4 0 8-3.6 8-8s-3.6-8-8-8h-88c-2.1 0-4.1-.8-5.9-2.6-.3-.3-.7-.8-1.1-1.5-.7-1.2-1.1-2.6-1.1-4 0-4.4 3.6-8 8-8h88c4.4 0 8-3.6 8-8s-3.6-8-8-8H247c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-1.4.4-2.8 1.1-4 1.5-2.5 4.1-4 6.9-4h104c4.4 0 8-3.6 8-8s-3.6-8-8-8h-72c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-4.4 3.6-8 8-8h112c.2 0 .4-.1.5-.1.5 0 1-.2 1.5-.3.5-.1 1-.3 1.5-.5.2-.1.4-.1.5-.2.3-.2.4-.4.7-.6.4-.3.8-.7 1.2-1.1.3-.4.6-.8.8-1.2.3-.4.5-.9.6-1.4.2-.5.3-1 .3-1.6 0-.3.2-.6.2-.9 0-.2-.1-.3-.1-.5 0-.5-.2-1-.3-1.6-.1-.5-.3-1-.5-1.5-.1-.2-.1-.4-.2-.5l-13.6-22.7c-1.7-2.9-2.6-5.9-2.6-9.2 0-4.8 1.8-9.2 5.1-12.5 1.1-1 2.4-1.6 3.9-1.5.8 0 2.3.3 3.5 1.7l58 64.5c4.5 5 11.1 7.9 17.9 7.9h24.9v72zm-26.6-88.4c-1.6-.4-3.1-1-4.2-2.3l-58-64.4c-3.8-4.3-9.1-6.8-14.9-7-5.8-.3-11.5 2-15.7 6.2-6.4 6.4-9.9 14.8-9.9 23.9 0 6.1 1.7 12.1 4.8 17.4l6.4 10.6h-97.9c-13.2 0-24 10.8-24 24 0 2.8.6 5.5 1.4 8h-9.4c-6.9 0-13.2 3-17.7 8H39.4c2-54.6 24.2-105.8 63.1-144.7 33.4-33.4 75.6-54.5 121.3-61l31.4-2.3c10.2 0 20.3.7 30.9 2.2 94.7 13.6 168.4 87.6 182.5 181.4z"></path></svg>
        
                                </div>
        
                            </div>
                        </div>
        
                        <div className='flex items-start  top-[5.5rem] '>
                            <div className=' top-[-7rem] left-[-7rem]'>
                                <img className='  w-60 h-60 rounded-full shadow-xl'
                                    src={`http://127.0.0.1:8000${food.food_img}`} alt={food.name}></img>
                                <div className=" bg-red_paint w-[15rem] bg-contain bg-no-repeat rounded-lg  text-center text-slate-800 text-3xl font-bold">
        
                                    <span className=' pt-3 block'>{food.name}</span>
                                </div>
        
                            </div>
        
                        </div>
    
        
                        
                    </div>
                </div>
    
                    
                )))
                :(foods && foods.map((food) => (
                
                
                    <div className=" font-Chalk text-stone-100   flex items-center justify-center ">
                    <div className="  top-10  rounded-lg p-6 w-[62rem]">
                        <div className=' h-60 flex flex-col justify-center bg-food-pattern   child:ml-36  float-right  w-[52rem]  rounded-lg'>
                            <h2 className=' text-xl '>{food.description}</h2>
                            <div className='flex justify-between align-top '>
                                <div>
                                    <span className=' text-2xl'>CONTENT:</span>
                                    {food.food_content && food.food_content.map((content, index) => (
                                        <h2 key={content.name} className=''>
                                            <div className=' flex justify-start gap-10 child:text-lg'>
                                                <span className=''>{content.name}</span>
                                                <span>{content.grams_weight} gr</span>
                                            </div>
                                        </h2>
                                    ))}
                                </div>
                                <div>
                                    <h5 className=' text-3xl mr-10'>Price: {food.price} $</h5>
                                    <svg className=' bg-slate-200 w-8 h-8 cursor-pointer' onClick={() => addToOrder(food.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="food-delivery"><path d="M283.3 82.8c-7.6-7-17.6-10.8-28.1-10.8-22.1 0-40 16.9-40 37.8v5.9c-47 8.1-89.8 30.1-124.1 64.3-42.2 42.3-66 97.8-67.8 157.1-5.5 1.4-10.6 4.2-14.8 8.3-6.1 6-9.4 14.1-9.4 22.6 0 17.6 14.4 32 32 32h214.2c.3.3.5.6.8.9 4.5 4.6 10.5 7.1 17 7.1h17.5c-.9 2.5-1.5 5.2-1.5 8 0 6.5 2.5 12.5 7 16.9 4.5 4.6 10.5 7.1 17 7.1h71.3c6.8 0 13.4-1.2 19.7-3.5l47.6-17.9c4.6-1.7 9.3-2.5 14.1-2.5h47.3c4.4 0 8-3.6 8-8v-88c0-4.4-3.6-8-8-8h-18.4c-13.8-99.8-90.3-179.1-189.6-196.4v-5.8c.1-10.2-4.2-20-11.8-27.1zM495.2 400h-39.3c-6.7 0-13.3 1.2-19.7 3.5l-47.7 17.9c-4.4 1.7-9.3 2.5-14.1 2.5h-71.3c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-4.4 3.6-8 8-8h48c4.4 0 8-3.6 8-8s-3.6-8-8-8h-88c-2.1 0-4.1-.8-5.9-2.6-.3-.3-.7-.8-1.1-1.5-.7-1.2-1.1-2.6-1.1-4 0-4.4 3.6-8 8-8h88c4.4 0 8-3.6 8-8s-3.6-8-8-8H247c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-1.4.4-2.8 1.1-4 1.5-2.5 4.1-4 6.9-4h104c4.4 0 8-3.6 8-8s-3.6-8-8-8h-72c-2.1 0-4.1-.8-5.7-2.5-1.5-1.4-2.3-3.4-2.3-5.5 0-4.4 3.6-8 8-8h112c.2 0 .4-.1.5-.1.5 0 1-.2 1.5-.3.5-.1 1-.3 1.5-.5.2-.1.4-.1.5-.2.3-.2.4-.4.7-.6.4-.3.8-.7 1.2-1.1.3-.4.6-.8.8-1.2.3-.4.5-.9.6-1.4.2-.5.3-1 .3-1.6 0-.3.2-.6.2-.9 0-.2-.1-.3-.1-.5 0-.5-.2-1-.3-1.6-.1-.5-.3-1-.5-1.5-.1-.2-.1-.4-.2-.5l-13.6-22.7c-1.7-2.9-2.6-5.9-2.6-9.2 0-4.8 1.8-9.2 5.1-12.5 1.1-1 2.4-1.6 3.9-1.5.8 0 2.3.3 3.5 1.7l58 64.5c4.5 5 11.1 7.9 17.9 7.9h24.9v72zm-26.6-88.4c-1.6-.4-3.1-1-4.2-2.3l-58-64.4c-3.8-4.3-9.1-6.8-14.9-7-5.8-.3-11.5 2-15.7 6.2-6.4 6.4-9.9 14.8-9.9 23.9 0 6.1 1.7 12.1 4.8 17.4l6.4 10.6h-97.9c-13.2 0-24 10.8-24 24 0 2.8.6 5.5 1.4 8h-9.4c-6.9 0-13.2 3-17.7 8H39.4c2-54.6 24.2-105.8 63.1-144.7 33.4-33.4 75.6-54.5 121.3-61l31.4-2.3c10.2 0 20.3.7 30.9 2.2 94.7 13.6 168.4 87.6 182.5 181.4z"></path></svg>
        
                                </div>
        
                            </div>
                        </div>
        
                        <div className='flex items-start  top-[5.5rem] '>
                            <div className=' top-[-7rem] left-[-7rem]'>
                                <img className='  w-60 h-60 rounded-full shadow-xl'
                                    src={`http://127.0.0.1:8000${food.food_img}`} alt={food.name}></img>
                                <div className=" bg-red_paint w-[15rem] bg-contain bg-no-repeat rounded-lg  text-center text-slate-800 text-3xl font-bold">
        
                                    <span className=' pt-3 block'>{food.name}</span>
                                </div>
        
                            </div>
        
                        </div>
    
        
                        
                    </div>
                </div>
    
                    
                )))}
            
        </div>
    );
}

export default FoodsList;
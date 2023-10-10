import React from 'react';
import { useGetCartQuery } from '../../redux/services/userPnael/userPnaelAPI';
// import CurrentUser from '../../CurrentUser';
import { Link } from 'react-router-dom';
import { useDeleteReservMutation } from '../../redux/services/rooms/reservationAPI';


function Cart(user) {
    // console.log(typeof(user.id))
    console.log(user)
    console.log(user.user?.id)
    const { data: cart, isLoading, isError, error } = useGetCartQuery(user.user?.id);
    const [deleteReserv] = useDeleteReservMutation();
    const DateDifference = (start_date, end_date) => {
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        const diffInMilliseconds = Math.abs(endDate - startDate);
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
        return diffInDays
    }
    // convert 2023-10-04T01:01:06.511311Z to 2023-10-04 01:01:06
    const DateTimeFormat = (originalDateString) => {
        const formattedDate = new Date(originalDateString).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        return formattedDate
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.status} {console.log(error)}</div>;
    }

    return (
        <div>

            <div class="bg-gray-100 h-screen py-8">
                <div class="container mx-auto px-4">
                    <h1 class="text-2xl font-semibold mb-4">My Rooms</h1>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div className='md:w-3/4'>
                            {cart.reservations && cart.reservations.map((reservation) =>
                                <>
                                    <div class="">
                                        <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                                            <table class="w-full">
                                                <thead>
                                                    <tr>
                                                        <th class="text-left font-semibold">Room</th>
                                                        <th class="text-left font-semibold">Cost</th>
                                                        <th class="text-left font-semibold">Entry Date</th>
                                                        <th class="text-left font-semibold">Exit Date</th>
                                                        <th class="text-left font-semibold">persons_number</th>
                                                        <th class="text-left font-semibold">Days</th>
                                                        <th class="text-left font-semibold">Total Cost</th>
                                                        <th class="text-left font-semibold">Edit</th>
                                                        <th class="text-left font-semibold">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="py-4">
                                                            <div class="flex items-center">
                                                                <img class="h-16 w-16 mr-4" src={`http://127.0.0.1:8000${reservation.room.main_img}`} alt="Product_image" />
                                                                <span class="font-semibold">{reservation.room.room_name}</span>
                                                            </div>
                                                        </td>
                                                        <td class="py-4">${reservation.room.price}</td>
                                                        {/* onClick={()=>updateReserv({id:reservation.id,})} */}
                                                        <td class="py-4">{reservation.entry_date}</td>
                                                        <td class="py-4">{reservation.exit_date}</td>
                                                        <td class="py-4">{reservation.persons_number}</td>
                                                        <td class="py-4">
                                                            {DateDifference(reservation.entry_date, reservation.exit_date)}days
                                                        </td>
                                                        <td class="py-4">
                                                            {DateDifference(reservation.entry_date, reservation.exit_date) * reservation.room.price}</td>
                                                        <td onc class="py-4">
                                                            <Link state={{ data: reservation.room, reservation:reservation  }} to={`/room/${encodeURIComponent(reservation.room.room_name)}`} className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">edit</Link>

                                                        </td>
                                                        <td className=' cursor-pointer' onClick={()=>deleteReserv(reservation.id)} class="py-4">delete</td>

                                                        

                                                    </tr>
                                                    {/* <!-- More product rows --> */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>


                            )}
                            {cart.orders && cart.orders.map((order) =>
                                <div class="">
                                    <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                                        <table class="w-full">
                                            <thead>
                                                <tr>
                                                    <th class="text-left font-semibold">Food</th>
                                                    <th class="text-left font-semibold">Price</th>
                                                    <th class="text-left font-semibold">Quantity</th>
                                                    <th class="text-left font-semibold">Order Date</th>
                                                    <th class="text-left font-semibold">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="py-4">
                                                        <div class="flex items-center">
                                                            <img class="h-16 w-16 mr-4" src={`http://127.0.0.1:8000${order.food.food_img}`} alt="Product_image" />
                                                            <span class="font-semibold">{order.food.name}</span>
                                                        </div>
                                                    </td>
                                                    <td class="py-4">${order.food.price}</td>
                                                    <td class="py-4">
                                                        <div class="flex items-center">
                                                            <button class="border rounded-md py-2 px-4 mr-2">-</button>
                                                            <span class="text-center w-8">{order.foods_number}</span>
                                                            <button class="border rounded-md py-2 px-4 ml-2">+</button>
                                                        </div>
                                                    </td>
                                                    <td class="py-4">{DateTimeFormat(order.order_date)}</td>
                                                    <td class="py-4">${(order.food.price) * (order.foods_number)}</td>
                                                </tr>
                                                {/* <!-- More product rows --> */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            )}

                        </div>





                        <div class="md:w-1/4">
                            <div class="bg-white rounded-lg shadow-md p-6">
                                <h2 class="text-lg font-semibold mb-4">Summary</h2>
                                <div class="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>$19.99</span>
                                </div>
                                <div class="flex justify-between mb-2">
                                    <span>Taxes</span>
                                    <span>$1.99</span>
                                </div>
                                <div class="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span>$0.00</span>
                                </div>
                                <hr class="my-2" />
                                <div class="flex justify-between mb-2">
                                    <span class="font-semibold">Total</span>
                                    <span class="font-semibold">$21.98</span>
                                </div>
                                <button class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
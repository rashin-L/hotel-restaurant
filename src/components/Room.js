
import React from 'react';
import { useAddLikeMutation } from '../redux/services/rooms/roomAPI';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { useReservationMutation } from '../redux/services/rooms/reservationAPI';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import queryString from 'query-string';
import CurrentUser from '../CurrentUser';
import Swal from 'sweetalert2';



const Room = ({ recordsbool, records, user, data, isError, error, isLoading, room_likes, children }) => {
    const [addLike, { error: likeError, isError: likeIsError }] = useAddLikeMutation()
    const [reservation,] = useReservationMutation();


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return (
            <div>
                Error: {error.message}
                {console.log(error.status)}

            </div>
        );
    }

    const RoomRateAverage = (room_id) => {
        let sum = 0;
        let count = 0;

        room_likes.forEach((like) => {
            if (like.room === room_id) {
                sum += like.score;
                count++;
            }
        });

        const average = count > 0 ? sum / count : 0;
        return average.toFixed(1);
    }
    const handleRating = async (newValue, room_id) => {

        if (likeIsError) {
            console.log(likeError.data);
            Swal.fire({
                icon: 'error',
                // title: 'Yes...',
                text: likeError.data,
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        } else {
            const response = addLike(
                queryString.stringify({
                    score: newValue,
                    room: room_id,
                    user_liked: user.id,
                })
            );
            response.then(response => {
                console.log(response)
                if (response.data) {
                    Swal.fire({
                        icon: 'success',
                        // title: 'Yes...',
                        text: response.data.message,
                        // footer: '<a href="">Why do I have this issue?</a>'
                    })
                } else {
                    Swal.fire({
                        icon: 'warning',
                        // title: 'Yes...',
                        text: response.error.data.message,
                    })
                }
            });

        }
    };
    const handleReservation = async () => {
        try {
            const reservationData = (
                {
                    entry_date: '2024-08-28',
                    exit_date: '2024-09-28',
                    reservatore: 1,
                    room: 1,
                }

            );
            const payload = await reservation(reservationData);
            console.log('fulfilled', payload)
            // console.log('Reservation successful:', data);
        } catch (error) {
            console.log('Reservation error:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>

            <div >
                {/* Render children prop */}
                {children}
            </div>
            {/* {console.log(user)} */}
            {recordsbool
                ? (
                    <div className='  mb-52 font-Barlow-Regular'>
                        <div className='max-w-[80%] h-auto m-auto  flex flex-wrap justify-between align-middle items-center'>

                            {records && records.map((room) => (
                                <div className="w-[25rem] mt-7 mb-4   border-solid border-2 border-neutral-200 rounded-lg dark:bg-gray-800 ">
                                    <Link to="#">
                                        <img className="relative top-[-1px] w-[25.1rem] mb-1 h-[20.5rem] rounded-md" src={`http://127.0.0.1:8000/${room.main_img}`} alt="product" />
                                    </Link>
                                    <div className="flex px-5 items-center mt-2.5 mb-5">
                                        {user && user && (
                                            <Stack spacing={1}>
                                                {room_likes
                                                    .filter((like) => like.user_liked === user.id && like.room === room.id)
                                                    .map((like) => (
                                                        <Rating
                                                            value={like.score}
                                                            onChange={(event, newValue) => handleRating(newValue, room.id)}
                                                            name="half-rating"
                                                            defaultValue={2.5}
                                                        // precision={0.5}
                                                        />
                                                    ))}
                                                {room_likes
                                                    .filter((like) => like.user_liked === user.id && like.room === room.id)
                                                    .length === 0 && (
                                                        <Rating
                                                            value={0}
                                                            onChange={(event, newValue) => handleRating(newValue, room.id)}
                                                            name="half-rating"
                                                            defaultValue={2.5}
                                                        // precision={0.5}
                                                        />
                                                    )}
                                            </Stack>
                                        )}

                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{RoomRateAverage(room.id)}</span>
                                    </div>
                                    <div className="px-5 pb-5">
                                        <div>
                                            <Link state={{ data: room }} to={`room/${room.room_name}`} className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.room_name}</Link>
                                            <div>
                                                <span className="text-lg font-bold text-emerald-400 dark:text-white">${room.price}</span>
                                                <span className='text-lg font-bold text-slate-400'>/ Per Person</span>
                                            </div>
                                            <div className=' flex justify-between'>
                                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.room_styles.room_type}</h5>
                                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.beds} beds</h5>
                                            </div>
                                            <button onClick={handleReservation} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>)
                : (<div className=' mb-52 font-Barlow-Regular'>
                    <div className='max-w-[80%] h-auto m-auto  flex flex-wrap justify-between align-middle items-center'>

                        {data && data.map((room) => (
                            <div className="w-[25rem]  bg-white border-solid border-2 border-neutral-200 rounded-lg dark:bg-gray-800 ">
                                <Link to="#">
                                    <img className="relative top-[-1px] w-[25.1rem] mb-1 h-[20.5rem] rounded-md" src={`http://127.0.0.1:8000/${room.main_img}`} alt="product" />
                                </Link>
                                <div className="flex px-5 items-center mt-2.5 mb-5">
                                    {user && user && (
                                        <Stack spacing={1}>
                                            {room_likes
                                                .filter((like) => like.user_liked === user.id && like.room === room.id)
                                                .map((like) => (
                                                    <Rating
                                                        value={like.score}
                                                        onChange={(event, newValue) => handleRating(newValue, room.id)}
                                                        name="half-rating"
                                                        defaultValue={2.5}
                                                    // precision={0.5}
                                                    />
                                                ))}
                                            {room_likes
                                                .filter((like) => like.user_liked === user.id && like.room === room.id)
                                                .length === 0 && (
                                                    <Rating
                                                        value={0}
                                                        onChange={(event, newValue) => handleRating(newValue, room.id)}
                                                        name="half-rating"
                                                        defaultValue={2.5}
                                                    // precision={0.5}
                                                    />
                                                )}
                                        </Stack>
                                    )}

                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{RoomRateAverage(room.id)}</span>
                                </div>
                                <div className="px-5 pb-5">
                                    <div>
                                        <Link state={{ data: room }} to={`room/${room.room_name}`} className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.room_name}</Link>
                                        <div>
                                            <span className="text-lg font-bold text-emerald-400 dark:text-white">${room.price}</span>
                                            <span className='text-lg font-bold text-slate-400'>/ Per Person</span>
                                        </div>
                                        <div className=' flex justify-between'>
                                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.room_styles.room_type}</h5>
                                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.beds} beds</h5>
                                        </div>
                                        <button onClick={handleReservation} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <Link state={{ data: rooms }} to="/rooms" className="text-white bg-emerald-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Rooms List</Link> */}

                </div>)}

        </>

    )
};



export default CurrentUser(Room);
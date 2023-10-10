import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReservationMutation, useGetReservQuery } from '../../redux/services/rooms/reservationAPI';
// import { DateRangePicker } from 'react-date-range';
// import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import queryString from 'query-string';
// import CurrentUser from '../../CurrentUser';
import { TEInput, TERipple } from "tw-elements-react";
import { useFormik } from "formik";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { useUpdateReservMutation } from '../../redux/services/rooms/reservationAPI';



function RoomDetail(user) {
    const location = useLocation();
    const data = location; // Access the props from the location state
    const [reservation, { error, isError }] = useReservationMutation();
    const { data: reservData, } = useGetReservQuery();
    const [value, setValue] = useState(0)
    // const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(data?.state?.reservation ? addDays(new Date(data.state.reservation.exit_date), 1) : new Date());
    const [startDate, setStartDate] = useState(data?.state?.reservation ? addDays(new Date(data.state.reservation.entry_date), 1) : new Date());
    // const [endDate, setEndDate] = useState(new Date());
    const [disabledDates, setDisabledDates] = useState([]);
    // const startDateRange = new Date('2023-10-10');
    // const endDateRange = new Date('2023-10-14');
    const [updateReserv, { isLoading }] = useUpdateReservMutation();


    const excludeRanges = (startDateRange, endDateRange) => {
        const excludeDates = [];

        // Loop through the date range and add each date to the excludeDates array
        for (let date = startDateRange; date <= endDateRange; date.setDate(date.getDate() + 1)) {
            excludeDates.push(new Date(date));
        }
        setDisabledDates(excludeDates);
        // console.log(disabledDates)
    }


    // console.log(reservData)


    useEffect(() => {
        const roomReservData = reservData?.filter((reserv) => reserv.room === data.state.data.id);
        if (roomReservData) {

            const entryDate = roomReservData[0]?.entry_date;
            const exitDate = roomReservData[0]?.exit_date;

            const entryDateObj = new Date(entryDate);
            const exitDateObj = new Date(exitDate);

            // const disabledRange = {
            //     startDate: entryDateObj,
            //     endDate: exitDateObj,
            //     key: 'customRange',
            // };
            excludeRanges(addDays(entryDateObj, 1), addDays(exitDateObj, 1));

        }
    }, [reservData]);

    // const isDateDisabled = (date) => {
    //     const startDateRange = new Date('2023-10-10');
    //     const endDateRange = new Date('2023-10-14');
    //     return date <= startDateRange && date >= endDateRange;
    // };

    const dateFormat = (dateTime) => {
        const date = new Date(dateTime);
        // const reverseDate = date.toLocaleDateString().split('/').reverse().join('-');
        // const formattedDate = new Date(reverseDate)
        // console.log(formattedDate); // Output: '2024-08-28'
        const month = '' + (date.getMonth() + 1);
        const day = '' + date.getDate();
        const year = date.getFullYear();
        return [year, month, day].join('-');
    }



    const form = useFormik({
        initialValues: {
            persons_number: data?.state?.reservation
                ? (data.state.reservation.persons_number) : (2),
        },
        // data?.state?.reservation
        //     ?(data.state.reservation.persons_number)
        //                                             : (form.values.persons_number)

        onSubmit: (values, { setSubmitting }) => {
            const entryDate = dateFormat(startDate)
            const exitDate = dateFormat(endDate)
            const userId = user.user.id;
            if (isError) {
                console.log(error.data)
            }
            else {
                if (data?.state?.reservation) {
                    console.log(data?.state?.reservation)
                    console.log(data?.state?.reservation?.id)
                    const response = updateReserv(queryString.stringify({
                        id: data?.state?.reservation?.id,
                        entry_date: [entryDate],
                        exit_date: [exitDate],
                        reservatore: userId,
                        room: data.state.data.id,
                        // room: 3,
                        persons_number: form.values.persons_number
                        // persons_number: value


                    }));
                    console.log(data?.state?.reservation?.id)
                    console.log(entryDate)
                    console.log(exitDate)
                    console.log(userId)
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
                            console.log(response)
                            Swal.fire({
                                icon: 'warning',
                                // title: 'Yes...',
                                // text: response.error.data.message,
                                text: response.error.data.message.non_field_errors[0],
                            })
                        }
                    });
                }
                else {
                    const response = reservation(queryString.stringify({
                        entry_date: [entryDate],
                        exit_date: [exitDate],
                        reservatore: userId,
                        room: data.state.data.id,
                        // room: 3,
                        persons_number: value


                    }));
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
                                text: response.error.data.message.non_field_errors[0],
                            })
                        }
                    });
                }

                


                // navigate('/');
                setTimeout(() => {
                    setSubmitting(false)
                }, 2000);
            }


        },
        // onSubmit: (values) => {
        //     mutate(values, {
        //         onSuccess: () => {
        //             alert("Form submitted successfully");
        //         },
        //         onError: (response) => {
        //             alert("An error occured while submiting the form");
        //             console.log(response);
        //         }
        //     });
        // },

    })
    return (

        <div className='max-w-[80%] h-auto m-auto mt-14 font-Barlow-Regular'>

            <div className="  dark:bg-gray-800 ">
                <div className=' grid grid-cols-3 grid-rows-2 m-auto' to="#">
                    {/* {console.log(data.state.data)} */}
                    <img className="relative top-[-1px] row-span-2 col-span-2 mb-1 w-[100%] rounded-md" src={`http://127.0.0.1:8000/${data.state.data.main_img}`} alt="product" />

                    <div className='  flex flex-wrap gap-2 ml-3'>
                        {data.state.data.room_gallery && data.state.data.room_gallery.map((room_image) => (
                            <div className='w-[48%] h-[50%]'>
                                <img className="relative top-[-1px]  mb-1  rounded-md" src={`http://127.0.0.1:8000/${room_image.room_img}`} alt="product" />
                                {/* {console.log(room_image)} */}
                            </div>
                        ))}
                    </div>


                </div>
                <h1>{data.state.data.room_name}</h1>
                <div>
                    <Stack spacing={1}>
                        <Rating value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }} name="half-rating" defaultValue={2.5} precision={0.5} />
                    </Stack>
                </div>
                <div className="px-5 pb-5">
                    <div>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{data.state.data.data_name}</h5>
                        <div>
                            <span className="text-lg font-bold text-emerald-400 dark:text-white">${data.state.data.price}</span>
                            <span className='text-lg font-bold text-slate-400'>/ Per Person</span>
                        </div>
                        <div className=' flex justify-start gap-5 mt-3'>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{data.state.data.room_styles.room_type}</h5>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{data.state.data.beds} beds</h5>

                        </div>
                        <div>
                            <h4>{data.state.data.description}</h4>
                            {/* {console.log(data.state.data)} */}
                        </div>

                        {/* entry_date:{value} */}

                        <div className=' text-2xl mt-10  flex justify-start gap-3 align-baseline'>
                            {/* <CalendarComponent min={startDate} max={endDate} id="calendar" /> */}

                            {/* {user && user.user && user.user.is_active === true && ( */}
                            {user && user.user && user.user.is_active === true && (
                                <>

                                    <span>Entry date:</span>

                                    <DatePicker
                                        // selected={data?.state?.reservation
                                        //     ? (addDays(new Date(data.state.reservation.entry_date), 1))
                                        //     : (startDate)}
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        minDate={new Date()}
                                        endDate={endDate}
                                        excludeDates={disabledDates}
                                    />
                                    <span>Exit date:</span>


                                    <DatePicker
                                        // selected={data?.state?.reservation
                                        //     ? (addDays(new Date(data.state.reservation.exit_date), 1))
                                        //     : (endDate)}
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={new Date()}
                                        // disabledDate={(date) => date >= startDateRange && date <= endDateRange}
                                        // eslint-disable-next-line no-undef
                                        excludeDates={disabledDates}
                                    />
                                    <div className=' self-end text-lg'>
                                        <form onSubmit={form.handleSubmit}>

                                            {/* <!-- active code input --> */}
                                            <TEInput
                                                type="number"
                                                label="Persons Number"
                                                size="lg"
                                                className="mb-6"
                                                name="persons_number"
                                                // value={data?.state?.reservation
                                                //     ? (data.state.reservation.persons_number)
                                                //     : (form.values.persons_number)}
                                                value={form.values.persons_number}
                                                onChange={form.handleChange}
                                                onBlur={form.handleBlur}
                                            ></TEInput>



                                            <div className="text-center lg:text-left">
                                                <TERipple rippleColor="light">
                                                    <button
                                                        type="submit"
                                                        disabled={form.isSubmitting}
                                                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                    >
                                                        {form.isSubmitting ? <span>Loading...</span> : <span>Book Room</span>}

                                                    </button>
                                                </TERipple>


                                            </div>
                                        </form>
                                        {/* <input required placeholder='Person number' />

                                <button onClick={handleReservation} className=" h-fit text-white bg-[#3d91ff]  hover:bg-success-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book Room</button> */}
                                    </div>
                                </>
                            )}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetail;
import React, {useEffect, useState} from 'react';
import { useGetRoomQuery } from '../redux/services/rooms/roomAPI';

function Search( ) {
    const { data: rooms, isError, error, isLoading } = useGetRoomQuery();
    const allRooms = rooms?.ser_data;
    const room_likes = rooms?.ser_room_likes;
    const [records, setRecords] = useState([]);

    const [recordsbool, setRecordsbool] = useState(false);
    const [filters, setFilters] = useState({
        filterName: '',
        filterPrice: '',
        filterBeds: ''
    });
    useEffect(() => {
        const { filterName } = filters;

        let filteredRoom = (allRooms ?? []).filter((room) => {
            
            return room.room_name.toLowerCase().includes(filterName.toLowerCase())
        });
        
        
        setRecords(filteredRoom);
        setRecordsbool(true);
    }, [allRooms, filters, records])
    const changeHandler = (event) => {
        let filterName = event.target.value;
        setFilters((prevFilters) => ({ ...prevFilters, filterName }));
        return filterName;
    };
    return (
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
    );
}

export default Search;
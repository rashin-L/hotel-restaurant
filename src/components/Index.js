import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useGetRoomQuery } from '../redux/services/rooms/roomAPI';
import Gallery from '../pages/hotel/Gallery';
import Room from './Room';
import CurrentUser from '../CurrentUser';
import Foods from '../pages/foods/Foods';

const EnhancedRoom = CurrentUser(Room);
const EnhancedFoom = CurrentUser(Foods);

function Index() {
    const { data: rooms, isError, error, isLoading } = useGetRoomQuery();
    const sliceData = rooms?.ser_data.slice(0, 3);
    const room_likes = rooms?.ser_room_likes;

    return (
        <div>
            <Gallery />
            <EnhancedRoom
                room_likes={room_likes}
                data={sliceData}
                isError={isError}
                error={error}
                isLoading={isLoading}
            />
            <EnhancedFoom />
        </div>
    );
}
export default Index;
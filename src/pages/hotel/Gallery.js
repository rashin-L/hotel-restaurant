import React  from 'react';
// import {useGetgalleryQuery} from '../../redux/servises/galleryApi';  
import { useGetGalleryQuery } from '../../redux/services/hotel/galleryAPI';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Gallery = () => {
    const { data: gallery, isError, error, isLoading } = useGetGalleryQuery();
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {

        return <div>Error: {error.message}{console.log(error.status)}{console.log(gallery)}</div>


    }
    return (
        <div className=' mb-10'>

            <Carousel showArrows={false} showStatus={false} showThumbs={false} autoPlay={true} infiniteLoop={true}
            stopOnHover={false}
            animationHandler="fade" >
                {gallery.map((image) => (
                    <div key={image.id} >
                        <img className='h-[40rem]' src={`http://127.0.0.1:8000/${image.image}`} alt="img" />
                        {/* <p className="legend">Image 1</p> */}
                    </div>
                ))}
                
            </Carousel>
        </div>
    )
};



export default Gallery;
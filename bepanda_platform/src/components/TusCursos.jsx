import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';


// Import Swiper styles





const TusCursos = () => {
    const photos = [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Naturaleza-arboles.png/640px-Naturaleza-arboles.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Naturaleza-arboles.png/640px-Naturaleza-arboles.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Naturaleza-arboles.png/640px-Naturaleza-arboles.png',
    ];

    return (
        
        <>
        <div className='flex flex-col items-center h-full'>
        <div className='w-[65%] m-auto font-montserrat'>
                <p className='text-3xl font-semibold text-white text-center drop-shadow-xl'>Tus cursos</p>
                
                <Swiper speed={1000} spaceBetween={300} className='mb-10 p-12'  navigation={true} modules={[Navigation]}>
                    <SwiperSlide ><img  className='w-full rounded-md shadow-md' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Naturaleza-arboles.png/640px-Naturaleza-arboles.png" alt="" /></SwiperSlide>
                    <SwiperSlide><img className='w-full rounded-md shadow-md' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Naturaleza-arboles.png/640px-Naturaleza-arboles.png" alt="" /></SwiperSlide>
                    <SwiperSlide><img className='w-full rounded-md shadow-md' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Naturaleza-arboles.png/640px-Naturaleza-arboles.png" alt="" /></SwiperSlide>
                    <SwiperSlide><img className='w-full rounded-md shadow-md' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Naturaleza-arboles.png/640px-Naturaleza-arboles.png" alt="" /></SwiperSlide>
                </Swiper>
            </div>
        </div>


        </>
    );
};

export default TusCursos;

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';


// Import Swiper styles





const TusCursos = () => {


    return (
        
        <>
        <div className='flex flex-col items-center h-full'>
        <div className='w-[65%] m-auto font-montserrat'>
                <p className='text-3xl font-semibold text-white text-center drop-shadow-xl'>Tus cursos</p>
                
                <Swiper speed={1000} spaceBetween={300} className='mb-10 p-12'  navigation={true} modules={[Navigation]}>
                    <SwiperSlide ><img  className='w-[50rem] h-[32rem] m-auto rounded-md shadow-md' src="https://cff2.earth.com/uploads/2017/05/03154453/shutterstock_559454563.jpg" alt="" /></SwiperSlide>
                    <SwiperSlide ><img  className='w-[50rem] h-[32rem] m-auto rounded-md shadow-md' src="https://th.bing.com/th/id/R.c3399d9086cbf827f1adaea88b5cc6b6?rik=SoOjrGqCyV6m6Q&riu=http%3a%2f%2fpowerthoughtsmeditationclub.com%2fwp-content%2fuploads%2f2016%2f03%2fbreathingCover.jpg&ehk=Dm7uJFwPSNWP%2b%2fBqBgAkwMZk7QinPeGvYPi343HopAs%3d&risl=&pid=ImgRaw&r=0" alt="" /></SwiperSlide>

                    


                </Swiper>
            </div>
        </div>


        </>
    );
};

export default TusCursos;

// StaffPage.js
import React from 'react';
import Image from 'next/image';


const StaffPage = () => (
    <div className="container">
    <div className='content'>
    <Image className='image'
    src="https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2FpdGVyfGVufDB8fDB8fHww" 
    alt="Restaurant" 
    width={1000}
    height={1000}
  /> 
    <div className='description'>
            <h2  >Meet Our Staff</h2>
             
                Our team of dedicated professionals is the heart and soul of our restaurant. Each member brings a wealth of experience and a passion for hospitality to their role. From our talented chefs who craft exquisite dishes to our attentive front-of-house staff who ensure every guest feels welcomed, we are committed to providing exceptional service. Get to know the individuals who make our restaurant a special place to dine and learn about their unique contributions and experiences.
             </div>
        </div>
    </div>
);

export default StaffPage;

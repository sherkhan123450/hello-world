import React from 'react';
import Image from 'next/image';

const RestaurantPage = () => (
  <div className='container'>
      <div className='content'>
      <Image className='image'
      src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D" 
      alt="Restaurant" 
      width={1000}
      height={1000}
    /> 
      <div className='description'>
      <h2 className='heading'>About Our Restaurant</h2>
        Our restaurant offers a unique dining experience with a blend of traditional and modern culinary techniques. We take pride in using fresh, locally sourced ingredients to create dishes that are both delicious and visually appealing. From our cozy ambiance to our attentive service, every detail is designed to make your visit memorable. Whether you're here for a casual meal or a special occasion, we aim to provide a dining experience that exceeds your expectations.
      </div>
    </div>
  </div>
);

export default RestaurantPage;

 
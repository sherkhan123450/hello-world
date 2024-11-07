// ReservationPage.js
import React from 'react';
import Image from 'next/image';

const ReservationPage = () => (
  <div className="container">
    <div className="content">
      <Image
        className="image"
        src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D"
        alt="Restaurant"
        width={1000}
        height={1000}
      />
      <div className="description">
        <h2>Make a Reservation</h2>
        <p>
          At our restaurant, we aim to offer an unforgettable dining experience, and part of that is making your reservation process as smooth as possible. Whether you're planning an intimate dinner, a business lunch, or a large celebration, our team is here to accommodate your needs.
        </p>
         
      
        <p>
          Our goal is to provide a seamless reservation experience, ensuring you enjoy a worry-free dining experience from the moment you book to the time you arrive.
        </p>
      </div>
    </div>
  </div>
);

export default ReservationPage;

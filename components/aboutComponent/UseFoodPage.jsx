// UseFoodPage.js
import React from "react";
import Image from 'next/image';


const UseFoodPage = () => (
  <div className="container">
    <div className="content">
      <Image
        className="image"
        src="https://images.unsplash.com/photo-1528733918455-5a59687cedf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnJlc2glMjB2ZWdldGFibGVzfGVufDB8fDB8fHww"
        alt="Restaurant"
        width={1000}
        height={1000}
      />
      <div className="description">
        <h2>Sustainable Food Practices</h2>
        We are committed to sustainable food practices that benefit both the
        environment and our community. By sourcing ingredients from local farms
        and using eco-friendly packaging, we aim to reduce our carbon footprint
        and support sustainable agriculture. Our dedication to responsible food
        practices includes minimizing waste and promoting ethical sourcing.
        Learn how we are making a positive impact through our sustainable food
        initiatives and contributing to a better future for all.
      </div>
    </div>
  </div>
);

export default UseFoodPage;

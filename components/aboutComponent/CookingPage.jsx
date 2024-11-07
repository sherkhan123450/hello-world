// CookingPage.js
import React from 'react';
import Image from 'next/image';

const CookingPage = () => (
    <div className="container">
    <div className='content'>
    <Image className='image'
    src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29va2luZ3xlbnwwfHwwfHx8MA%3D%3D" 
    alt="Restaurant" 
    width={1000}
    height={1000}
  /> 
    <div className='description'>
            <h2 >Our Cooking Philosophy</h2> 
                At our restaurant, cooking is an art form. We combine the finest ingredients with innovative techniques to create dishes that are both flavorful and visually appealing. Our chefs experiment with new recipes and methods to push the boundaries of traditional cuisine. We are dedicated to farm-to-table freshness and the latest culinary trends, aiming to deliver memorable dining experiences that delight the senses and showcase our commitment to culinary excellence.
                </div>
        </div>
    </div>
);

export default CookingPage;

// CleaningPage.js
import React from 'react';
import Image from 'next/image';

const CleaningPage = () => (
  <div className="container">
    <div className="content">
      <Image
        className="image"
        src="https://images.unsplash.com/photo-1505650660682-a59267d2e120?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5NTk4OTk3fHxlbnwwfHx8fHw%3D" // Direct image URL
        alt="Cleaning Standards"
        width={1000}
        height={1000}
      />
      <div className="description">
        <h2>Our Cleaning Standards</h2>
        <p>
          Maintaining a clean and sanitary environment is a top priority. We adhere to rigorous cleaning protocols to ensure our restaurant is spotless and safe for both guests and staff. From regular sanitation of surfaces to deep cleaning procedures, we take every measure to uphold the highest standards of cleanliness. Our commitment to hygiene reflects our dedication to providing a safe and enjoyable dining experience, ensuring peace of mind for all who visit.
        </p>
      </div>
    </div>
  </div>
);

export default CleaningPage;

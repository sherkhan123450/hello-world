// components/GoogleMap.js
import React from "react";

const GoogleMap = () => {
  return (
    <div className="w-full h-96">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509645!2d144.95373531589002!3d-37.817209742021974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577cda6d5c5b2e2!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614315771646!5m2!1sen!2sau"
        width="100%"
        height="400px"
        allowFullScreen=""
        loading="lazy"
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
};

export default GoogleMap;

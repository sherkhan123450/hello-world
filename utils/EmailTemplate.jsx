// src/components/EmailTemplate.js

const EmailTemplate = (newPassword) => {
  return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333333;
            }
            p {
              font-size: 16px;
              line-height: 1.5;
              color: #555555;
            }
            .temp-password {
              font-weight: bold;
              color: #ff5733; /* Highlight color for the temporary password */
              font-size: 18px;
              background-color: #f0f0f0;
              padding: 10px;
              border-radius: 4px;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #777777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome!</h1>
            <p>We have generated a temporary password for you to access your account:</p>
            <div class="temp-password">${newPassword}</div>
            <p>Please log in using this password and remember to change it once you are in.</p>
            <p>If you have any questions, feel free to reach out to us.</p>
          </div>
          <div class="footer">
            <p>Thank you for being with us!</p>
          </div>
        </body>
      </html>
    `;
};

export default EmailTemplate;

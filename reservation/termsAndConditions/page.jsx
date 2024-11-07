"use client";

import React from "react";
import styled from "styled-components";

const termsAndConditions = [
  {
    title: "1. Reservations",
    content:
      "All reservations are subject to availability. We recommend making a reservation in advance, especially during peak times and weekends.",
  },
  {
    title: "2. Cancellation Policy",
    content:
      "Cancellations must be made at least 24 hours in advance. Failure to cancel within this period may result in a charge or loss of reservation deposit.",
  },
  {
    title: "3. Group Bookings",
    content:
      "For group bookings of more than 10 people, a non-refundable deposit may be required. Please contact our team for specific arrangements.",
  },
  {
    title: "4. Dietary Requirements",
    content:
      "We strive to accommodate dietary preferences and allergies. Please inform us of any special requirements at the time of booking.",
  },
  {
    title: "5. Payment",
    content:
      "We accept all major credit cards, debit cards, and cash. Service charges and taxes will be applied as per local regulations.",
  },
  {
    title: "6. Alcohol Service",
    content:
      "Alcohol will only be served to customers aged 21 and above. We reserve the right to request identification and refuse service to individuals who fail to provide proof of age.",
  },
  {
    title: "7. Conduct",
    content:
      "Guests are expected to maintain decorum. Any inappropriate behavior that disrupts other diners or staff may result in being asked to leave the premises.",
  },
  {
    title: "8. Outside Food & Beverages",
    content:
      "No outside food or beverages are permitted unless pre-approved for special occasions or events.",
  },
  {
    title: "9. Liability",
    content:
      "The restaurant is not responsible for any lost, stolen, or damaged personal property while on the premises.",
  },
  {
    title: "10. Changes to Terms",
    content:
      "We reserve the right to modify these terms and conditions without prior notice. Updated terms will be available on our website.",
  },
];

const Page = () => {
  return (
    <Container>
      <Heading>Terms and Conditions</Heading>
      {termsAndConditions.map((term, index) => (
        <TermItem key={index}>
          <TermTitle>{term.title}</TermTitle>
          <TermContent>{term.content}</TermContent>
        </TermItem>
      ))}
    </Container>
  );
};

export default Page;

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const TermItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
`;

const TermTitle = styled.h2`
  font-size: 1.2rem;
  color: #007bff;
  margin-bottom: 10px;
`;

const TermContent = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
`;

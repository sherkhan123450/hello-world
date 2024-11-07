import React from "react";
import styled from "styled-components";
import { FaConciergeBell, FaShippingFast } from "react-icons/fa"; // Example: Font Awesome icons

const Services = () => {
  return (
    <ServicesContainer>
      <ServiceItem>
        <ServiceIcon>
          <FaConciergeBell />
        </ServiceIcon>
        <ServiceContent>
          <ServiceDescription>
            <div>
              Enjoy round-the-clock access to our concierge service for all your
              requests and inquiries.
            </div>
            <hr />
            <div>We are here to assist you anytime.</div>
          </ServiceDescription>
        </ServiceContent>
      </ServiceItem>

      <ServiceItem>
        <ServiceIcon>
          <FaShippingFast />
        </ServiceIcon>
        <ServiceContent>
          <ServiceDescription>
            <div>We offer fast, reliable, and secure shipping,</div>
            <hr />
            <div>
              ensuring your orders reach you in perfect condition, wherever you
              are.
            </div>
          </ServiceDescription>
        </ServiceContent>
      </ServiceItem>
    </ServicesContainer>
  );
};

export default Services;

// Styled components

const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ServiceItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  color: #ffbc40;
  margin-right: 1.5rem;
`;

const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ServiceDescription = styled.div` // Changed to div from p
  font-size: 12px;
  color: #666;
  line-height: 1.5;
`;

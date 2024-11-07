'use client'

import React from 'react';
import styled from 'styled-components';
import ContactForm from '@/app/components/contactComponents/ContactForm';
import Map from "@/app/components/contactComponents/Map";

const ContactPage = () => {
  return (
    <>
      <Map />
      <PageWrapper>
        <Container>
          <ImageContainer>
            <ContactImage
              src="https://images.unsplash.com/photo-1590575824158-fed6dd1da0e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlbGVwaG9uZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Contact"
            />
          </ImageContainer>
          <ContentWrapper>
            <Title>Get in Touch</Title>
            <ContactForm />
          </ContentWrapper>
        </Container>
      </PageWrapper>
    </>
  );
};

export default ContactPage;

// Styled components
const PageWrapper = styled.div`
    padding: 2rem;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7fafc; /* bg-gray-100 */
  @media(max-width : 425px){
  padding:4vw; /* p-8 */

  }
`;

const Container = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-lg */
  border-radius: 0.5rem; /* rounded-lg */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 80rem; /* max-w-5xl */
  margin: 0 auto;

  @media (min-width: 1024px) {
    flex-direction: row; /* lg:flex-row */
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  
  @media (min-width: 1024px) {
    width: 50%; /* lg:w-1/2 */
  }
`;

const ContactImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  padding: 2rem; /* p-8 */
  width: 100%;
  
  @media (min-width: 1024px) {
    width: 50%; /* lg:w-1/2 */
  }
  @media(max-width : 888px){
  padding:10px; /* p-8 */

  }
`;

const Title = styled.h2`
  font-size: 1.875rem; /* text-3xl */
  font-weight: bold;
  color: #2d3748; /* text-gray-800 */
  margin-bottom: 1.5rem; /* mb-6 */
`;

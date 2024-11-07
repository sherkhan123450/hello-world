'use client'
import React from "react";
import styled from "styled-components";

// Sample packages data
const packages = [
  {
    name: "Premium Package",
    description:
      "A sophisticated dining experience with gourmet meals and fine beverages. Perfect for special occasions or corporate dinners.",
    features: [
      "Multi-course gourmet meal",
      "Fine wine or premium beverages",
      "Personalized service",
      "Ideal for special occasions",
    ],
  },
  {
    name: "Standard Package",
    description:
      "A great option for everyday dining, offering value and quality without the premium cost. Suitable for small gatherings.",
    features: [
      "Two-course meal",
      "Choice of beverages",
      "Comfortable seating",
      "Attentive service",
    ],
  },
  {
    name: "Economy Package",
    description:
      "A budget-friendly option with delicious, affordable meals. Great for casual dining and group gatherings.",
    features: [
      "Set menu with popular dishes",
      "Affordable pricing",
      "Quick and efficient service",
      "Perfect for casual meals",
    ],
  },
  {
    name: "Business Package",
    description:
      "Tailored for professional gatherings, with quick service and customizable menu options. Ideal for working lunches and meetings.",
    features: [
      "Customizable menu",
      "Private or semi-private dining area",
      "Fast service",
      "Complimentary coffee and tea",
    ],
  },
  {
    name: "Luxury Package",
    description:
      "An extravagant dining experience with exclusive offerings like private chefs and premium beverages. Perfect for high-profile events.",
    features: [
      "Gourmet multi-course meal",
      "Exclusive cocktails and fine wines",
      "Private chef and sommelier",
      "Luxurious decor and ambiance",
    ],
  },
  {
    name: "Deluxe Package",
    description:
      "A rich and memorable dining experience, ideal for large gatherings and special events, with premium service and menu options.",
    features: [
      "Three-course meal",
      "Complimentary premium drinks",
      "Priority seating",
      "Special décor and personalized service",
    ],
  },
];

const Page = () => {
  return (
    <Container>
      <Heading>Our Dining Packages</Heading>
      <PackageList>
        {packages.map((pkg, index) => (
          <PackageCard key={index}>
            <PackageName>{pkg.name}</PackageName>
            <PackageDescription>{pkg.description}</PackageDescription>
            <PackageFeatures>
              {pkg.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </PackageFeatures>
          </PackageCard>
        ))}
      </PackageList>
    </Container>
  );
};

export default Page;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Arial", sans-serif;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #333;
`;

const PackageList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const PackageCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const PackageName = styled.h2`
  font-size: 1.8rem;
  color: #007bff;
  margin-bottom: 10px;
`;

const PackageDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
`;

const PackageFeatures = styled.ul`
  list-style: none;
  padding-left: 0;
  font-size: 0.95rem;
  color: #333;

  li {
    margin-bottom: 8px;
  }
`;

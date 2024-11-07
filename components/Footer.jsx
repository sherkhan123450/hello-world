import styled from "styled-components";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useSelector } from "react-redux";

// Footer Component
const Footer = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <FooterWrapper>
      <Container>
        <FlexWrapper>
          <Column>
            <Title>Visit Us</Title>
            <Subtitle>
              Come experience our delicious food and warm hospitality. We're
              open every day!
            </Subtitle>
            <ContactInfo>
              <ContactItem>
                <FaMapMarkerAlt /> 123 Foodie Street, Flavor Town
              </ContactItem>
              <ContactItem>
                <FaPhoneAlt /> +1 (123) 456-7890
              </ContactItem>
              <ContactItem>
                <FaEnvelope /> contact@restaurant.com
              </ContactItem>
            </ContactInfo>
            <SocialIconsContainer>
              <SocialButton color="#3b5998">
                <FaFacebookF />
              </SocialButton>
              <SocialButton color="#1DA1F2">
                <FaTwitter />
              </SocialButton>
              <SocialButton color="#E4405F">
                <FaInstagram />
              </SocialButton>
              <SocialButton color="#0A66C2">
                <FaLinkedin />
              </SocialButton>
            </SocialIconsContainer>
          </Column>
          <Column>
            <LinksSection>
              <LinksColumn>
                <LinkTitle>Quick Links</LinkTitle>
                <ul>
                  <li>
                    <Link href="/foodItems" passHref>
                      <StyledLink>Our Menu</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" passHref>
                      <StyledLink>About Us</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" passHref>
                      <StyledLink>Contact Us</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" passHref>
                      <StyledLink>Cart</StyledLink>
                    </Link>
                  </li>
                  {user && isAuthenticated && (
                    <>
                      {" "}
                      <li>
                        <Link href="/orderedItems" passHref>
                          <StyledLink>Orders</StyledLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/reservation/your-reservations" passHref>
                          <StyledLink>Reservations</StyledLink>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </LinksColumn>
              <LinksColumn>
                <LinkTitle>Opening Hours</LinkTitle>
                <ul>
                  <li>
                    <StyledLink>Mon - Fri: 11 AM - 10 PM</StyledLink>
                  </li>
                  <li>
                    <StyledLink>Sat - Sun: 9 AM - 11 PM</StyledLink>
                  </li>
                  <li>
                    <StyledLink>Happy Hour: 4 PM - 6 PM</StyledLink>
                  </li>
                </ul>
              </LinksColumn>
            </LinksSection>
          </Column>
        </FlexWrapper>
        <Divider />
        <CopyrightText>
          &copy; {new Date().getFullYear()} Your Restaurant Name. All rights
          reserved.
        </CopyrightText>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;

// Styled Components
const FooterWrapper = styled.footer`
  background-color: rgba(0, 0, 0, 0.8);
  padding-top: 2rem;
  padding-bottom: 2rem;
  color: #e2e8f0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
`;

const Column = styled.div`
  width: 100%;
  padding: 1rem;
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const Title = styled.h4`
  font-size: 1.875rem;
  font-weight: 600;
  color: #ffbc40;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h5`
  font-size: 1.125rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #cbd5e0;
`;

const ContactInfo = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: #cbd5e0;
`;

const SocialIconsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
`;

const SocialButton = styled.button`
  background-color: white;
  color: ${(props) => props.color || "#000"};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: normal;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  outline: none;
  &:focus {
    outline: none;
  }
`;

const LinksSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: top;
  margin-bottom: 1.5rem;
`;

const LinksColumn = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  @media (min-width: 1024px) {
    width: 33.3333%;
  }
`;

const LinkTitle = styled.span`
  display: block;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffbc40;
  margin-bottom: 0.5rem;
`;

const StyledLink = styled.span`
  color: #a0aec0;
  font-size: 0.875rem;
  font-weight: 600;
  display: block;
  padding-bottom: 0.5rem;
  &:hover {
    color: #fff;
  }
`;

const Divider = styled.hr`
  margin: 1.5rem 0;
  border-color: #2d3748;
`;

const CopyrightText = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: #a0aec0;
  font-weight: 600;
  padding: 0.5rem;
`;

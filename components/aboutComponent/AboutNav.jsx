'use client'
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setActiveSection } from '../../store/slices/aboutSlice';


const cNavbar = () => {
    const dispatch = useDispatch();

    return (
        <Nav>
            <List>
                {['restaurant', 'staff', 'cooking', 'cleaning', 'useFood' , 'reservation'].map(section => (
                    <ListItem key={section}>
                        <Button onClick={() => dispatch(setActiveSection(section))}>
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Nav>
    );
};

export default cNavbar;

// Styled components for the navbar
const Nav = styled.nav`
  background-color: #ffbc40; /* Tailwind bg-gray-800 equivalent */
  color: white;
  padding: 1rem;
  width: 100%;

  @media (max-width: 425px) {
    padding: 0.5rem;
  }

`;

const List = styled.ul`
  display: flex;
  gap: 1rem;
  width: 100%;
  @media (max-width: 425px) {
    text-align: center;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }`;

const ListItem = styled.li``;

const Button = styled.button`
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;

  @media (max-width: 425px) {
    font-size: 0.8rem;
  }
  @media (max-width: 370px) {
    font-size: 0.7rem;
  }
  @media (max-width: 320px) {
    font-size: 0.6rem;
  }
  &:hover {
    text-decoration: underline;
  }
`;
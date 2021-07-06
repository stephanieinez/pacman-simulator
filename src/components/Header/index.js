import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadingText = styled.h1`
  margin-bottom: 0.5rem;
`;

const HelperText = styled.h2`
  margin-top: 0.5rem;
  font-style: italic;
  font-weight: 400;
  font-size: 1rem;
  max-width: 500px;
  text-align: center;
`;

export const Header = () => (
  <Wrapper>
    <HeadingText>Pacman Simulator</HeadingText>
    <HelperText>
      Set Pacman's starting position, then move them around the grid. You can
      change their direction by moving them left or right and reset their
      starting position by updating their X and Y Positions.
    </HelperText>
  </Wrapper>
);

import { useContext } from "react";
import styled from "styled-components";
import { CoordinateContext } from "../../context/CoordinateContext";

const Wrapper = styled.div`
  margin: 2rem 0 3rem 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

/**
 * creates an output component which reflects Pacman's current
 * X, Y and facing direction
 */
export function Output() {
  const { xCoordinate, yCoordinate, fCoordinate } =
    useContext(CoordinateContext);

  return (
    <Wrapper>
      Output: {xCoordinate}, {yCoordinate}, {fCoordinate}
    </Wrapper>
  );
}

import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { CoordinateContext } from "../../context/CoordinateContext";
import { directions } from "../../constants/directions";

const eat = keyframes`
  0% {
    border-right-color: transparent;
  }

  20% {
    border-right-color: var(--pacmanYellow);
  }
`;

/**
 * creates an animated Pacman who faces the direction of the props provided
 */
const PacmanImage = styled.div`
  width: 1px;
  height: 1px;
  border: 1rem solid var(--pacmanYellow);
  border-radius: 50%;
  border-right-color: transparent;
  animation: ${eat} 0.5s linear infinite;

  transform: ${({ direction }) => {
    switch (direction) {
      case directions.NORTH:
        return `rotate(-90deg)`;
      case directions.SOUTH:
        return `rotate(90deg)`;
      case directions.EAST:
        return `rotate(0deg)`;
      case directions.WEST:
        return `rotate(180deg)`;
      default:
        return `rotate(-90deg)`;
    }
  }};
`;

export function Pacman() {
  const { fCoordinate } = useContext(CoordinateContext);

  return <PacmanImage direction={fCoordinate} data-testid="pacman-image" />;
}

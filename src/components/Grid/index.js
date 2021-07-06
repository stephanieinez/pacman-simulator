import { useContext } from "react";
import styled from "styled-components";
import { Pacman } from "../Pacman";
import { CoordinateContext } from "../../context/CoordinateContext";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(5, [col] 10vw);
  grid-template-rows: repeat(5, [row] 10vw);
  border: 3px solid var(--black);
  box-shadow: 0 5px 8px var(--shadowGrey);
  justify-content: center;
  align-content: center;
  margin: 0 auto;
`;

const Square = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);

  &:nth-child(-2n + 25) {
    background-color: var(--black);
  }
`;

/**
 * renders the 2-dimentional gridArray and places Pacman on the grid
 * depending on their current X and Y coordinates
 */
export function Grid() {
  const { gridArray, xCoordinate, yCoordinate } = useContext(CoordinateContext);

  return (
    <Wrapper>
      {gridArray.map((_, rowIdx) =>
        gridArray.map((_, colIdx) => {
          const currentYCoordinate = gridArray.length - 1 - rowIdx;
          return (
            <Square
              key={`${currentYCoordinate}-${colIdx}`}
              data-testid={`square-${currentYCoordinate}-${colIdx}`}
            >
              {yCoordinate === currentYCoordinate && xCoordinate === colIdx ? (
                <Pacman />
              ) : null}
            </Square>
          );
        })
      )}
    </Wrapper>
  );
}

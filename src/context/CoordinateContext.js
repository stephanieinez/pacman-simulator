import { useState, createContext } from "react";
import { directions } from "../constants/directions";

export const CoordinateContext = createContext();

/**
 * initalises 5x5 2-dimenstional array
 */
const gridArray = new Array(5)
  .fill()
  .map(() => new Array(5).fill().map(() => null));

export function CoordinateProvider({ children }) {
  const [xCoordinate, setXCoordinate] = useState(0);
  const [yCoordinate, setYCoordinate] = useState(0);
  const [fCoordinate, setFCoordinate] = useState(directions.NORTH);

  /**
   * establishes the grid boundry and sets new position of Pacman depending on the
   * direction they are facing
   */
  const move = () => {
    const withinGrid = (val) => {
      if (val <= 0) {
        return 0;
      }

      if (val >= 4) {
        return 4;
      }

      return val;
    };

    switch (fCoordinate) {
      case directions.NORTH:
        setYCoordinate(withinGrid(yCoordinate + 1));
        break;
      case directions.SOUTH:
        setYCoordinate(withinGrid(yCoordinate - 1));
        break;
      case directions.EAST:
        setXCoordinate(withinGrid(xCoordinate + 1));
        break;
      case directions.WEST:
        setXCoordinate(withinGrid(xCoordinate - 1));
        break;
      default:
        throw new Error("Invalid position");
    }
  };

  /**
   * checks for the direction Pacman is currently facing, then shifts their
   * position 90 degrees left or right
   */
  const setDirection = (direction) => () => {
    const isRight = direction === "right";

    switch (fCoordinate) {
      case directions.NORTH:
        setFCoordinate(isRight ? directions.EAST : directions.WEST);
        break;
      case directions.SOUTH:
        setFCoordinate(isRight ? directions.WEST : directions.EAST);
        break;
      case directions.EAST:
        setFCoordinate(isRight ? directions.SOUTH : directions.NORTH);
        break;
      case directions.WEST:
        setFCoordinate(isRight ? directions.NORTH : directions.SOUTH);
        break;
      default:
        throw new Error("Invalid direction");
    }
  };

  return (
    <CoordinateContext.Provider
      value={{
        gridArray,
        xCoordinate,
        yCoordinate,
        fCoordinate,
        setXCoordinate,
        setYCoordinate,
        setFCoordinate,
        move,
        setDirection,
      }}
    >
      {children}
    </CoordinateContext.Provider>
  );
}

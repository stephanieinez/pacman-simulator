import { render, fireEvent, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

function positionPacman({ x, y }) {
  userEvent.selectOptions(screen.getByLabelText("X Position"), x);
  userEvent.selectOptions(screen.getByLabelText("Y Position"), y);
}

function getPacmanImage(square) {
  return within(square).getByTestId("pacman-image");
}

function getMoveButton() {
  return screen.getByTestId("move-button");
}

test("should simulate the inital selection and place Pacman image with correct coordinates", () => {
  render(<App />);
  const initalPosition = screen.getByTestId("square-0-0");

  expect(getPacmanImage(initalPosition)).toBeInTheDocument();

  positionPacman({ x: "1", y: "1" });

  const movedPosition = screen.getByTestId("square-1-1");
  expect(getPacmanImage(movedPosition)).toBeInTheDocument();
});

test("should face Pacman image in correct direction", () => {
  render(<App />);
  userEvent.selectOptions(screen.getByLabelText("Facing"), "SOUTH");

  expect(screen.getByTestId("pacman-image")).toHaveStyle(
    "transform: rotate(90deg)"
  );
});

test("should move Pacman image one location in the correct direction", () => {
  render(<App />);
  fireEvent.click(getMoveButton());

  const movedPosition = screen.getByTestId("square-1-0");

  expect(getPacmanImage(movedPosition)).toBeInTheDocument();
});

test("should rotate Pacman 360 degrees clockwise", () => {
  render(<App />);
  const rightButton = screen.getByTestId("right-button");
  const pacmanImage = screen.getByTestId("pacman-image");

  fireEvent.click(rightButton);
  expect(pacmanImage).toHaveStyle("transform: rotate(0deg)");

  fireEvent.click(rightButton);
  expect(pacmanImage).toHaveStyle("transform: rotate(90deg)");

  fireEvent.click(rightButton);
  expect(pacmanImage).toHaveStyle("transform: rotate(180deg)");

  fireEvent.click(rightButton);
  expect(pacmanImage).toHaveStyle("transform: rotate(-90deg)");
});

test("should rotate Pacman 360 degrees anticlockwise", () => {
  render(<App />);
  const leftButton = screen.getByTestId("left-button");
  const pacmanImage = screen.getByTestId("pacman-image");

  fireEvent.click(leftButton);
  expect(pacmanImage).toHaveStyle("transform: rotate(180deg)");

  fireEvent.click(leftButton);
  expect(pacmanImage).toHaveStyle("transform: rotate(90deg)");

  fireEvent.click(leftButton);
  expect(pacmanImage).toHaveStyle("transform: rotate(0deg)");

  fireEvent.click(leftButton);
  expect(pacmanImage).toHaveStyle("transform: rotate(-90deg)");
});

test("should not allow pacman leave the boundry of the grid", () => {
  render(<App />);
  const initalPosition = screen.getByTestId("square-0-0");

  // move south outside the grid
  userEvent.selectOptions(screen.getByLabelText("Facing"), "SOUTH");
  fireEvent.click(getMoveButton());
  expect(getPacmanImage(initalPosition)).toBeInTheDocument();

  // move west outside the grid
  userEvent.selectOptions(screen.getByLabelText("Facing"), "WEST");
  fireEvent.click(getMoveButton());
  expect(getPacmanImage(initalPosition)).toBeInTheDocument();

  // move north outisde the grid
  positionPacman({ x: "0", y: "4" });
  userEvent.selectOptions(screen.getByLabelText("Facing"), "NORTH");
  fireEvent.click(getMoveButton());
  expect(getPacmanImage(screen.getByTestId("square-4-0"))).toBeInTheDocument();

  // move east outside the grid
  positionPacman({ x: "4", y: "4" });
  userEvent.selectOptions(screen.getByLabelText("Facing"), "EAST");
  fireEvent.click(getMoveButton());
  expect(getPacmanImage(screen.getByTestId("square-4-4"))).toBeInTheDocument();
});

test("should render a description of the current coordinates", () => {
  render(<App />);

  positionPacman({ x: "2", y: "3" });
  userEvent.selectOptions(screen.getByLabelText("Facing"), "WEST");

  expect(screen.getByText("Output: 2, 3, WEST")).toBeInTheDocument();
});

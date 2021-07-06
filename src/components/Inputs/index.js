import { useContext } from "react";
import styled from "styled-components";
import { directions } from "../../constants/directions";
import { CoordinateContext } from "../../context/CoordinateContext";

const Wrapper = styled.div`
  display: flex;
  margin-top: 3rem;

  & label {
    font-weight: 600;
    margin-right: 0.5rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Select = styled.select`
  border: 2px solid var(--black);
  padding: 5px;
`;

const Text = styled.h3`
  font-family: "Tourney", cursive;
  margin-right: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  border: 2px solid var(--black);
  background-color: transparent;
  height: 2rem;
  padding: 0 1.25rem;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: var(--white);
    border-color: var(--white);
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const SelectInput = ({ name, labelText, handleChange, values }) => (
  <InputWrapper>
    <label htmlFor={name}>{labelText}</label>
    <Select id={name} name={name} onChange={handleChange} defaultValue={0}>
      {values.map((value, index) => (
        <option value={value} key={`option-${index}`}>
          {value}
        </option>
      ))}
    </Select>
  </InputWrapper>
);

// renders three select inputs to set the inital coordinates of Pacman,
// and three buttons to move and change the direction of Pacman
export function Inputs() {
  const {
    moveFunction,
    directionFunction,
    setXCoordinate,
    setYCoordinate,
    setFCoordinate,
  } = useContext(CoordinateContext);

  // sets Pacman's inital position
  const handleXChange = (event) => setXCoordinate(parseInt(event.target.value));
  const handleYChange = (event) => setYCoordinate(parseInt(event.target.value));
  const handleFacingChange = (event) => setFCoordinate(event.target.value);

  return (
    <>
      <Wrapper>
        <Text>Place</Text>
        <SelectInput
          name="x-axis"
          labelText="X Position"
          handleChange={handleXChange}
          values={[0, 1, 2, 3, 4]}
        />
        <SelectInput
          name="y-axis"
          labelText="Y Position"
          handleChange={handleYChange}
          values={[0, 1, 2, 3, 4]}
        />
        <SelectInput
          name="facing"
          labelText="Facing"
          handleChange={handleFacingChange}
          values={[
            directions.NORTH,
            directions.SOUTH,
            directions.EAST,
            directions.WEST,
          ]}
        />
      </Wrapper>
      <ButtonWrapper>
        <Text>Move</Text>
        <Button onClick={moveFunction} data-testid="move-button">
          Move
        </Button>
        <Button onClick={directionFunction("left")} data-testid="left-button">
          Left
        </Button>
        <Button onClick={directionFunction("right")} data-testid="right-button">
          Right
        </Button>
      </ButtonWrapper>
    </>
  );
}

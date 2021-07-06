import React from "react";
import styled from "styled-components";
import { Header } from "./components/Header";
import { Grid } from "./components/Grid";
import { Inputs } from "./components/Inputs";
import { Output } from "./components/Output";
import { CoordinateProvider } from "./context/CoordinateContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  height: 100%;
`;

function App() {
  return (
    <Wrapper>
      <CoordinateProvider>
        <Header />
        <Inputs />
        <Output />
        <Grid />
      </CoordinateProvider>
    </Wrapper>
  );
}

export default App;

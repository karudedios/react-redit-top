import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 10px;
  position: fixed;
  flex-direction: column;
  background-color: white;
`;

const Layer = styled.div`
  width: 30px;
  height: 3px;
  margin: 3px 0;
  background-color: grey;
`;

type Props = {
  onClick: Function,
}

export default function Hamburger({ onClick }: Props) {
  return (
    <Container onClick={onClick}>
      <Layer />
      <Layer />
      <Layer />
    </Container>
  );
}

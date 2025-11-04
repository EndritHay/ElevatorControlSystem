import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header } from './components/Header';
import { Building } from './components/Building';
import { ControlPanel } from './components/ControlPanel';
import { useElevatorStore } from './stores/elevatorStore';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.space[6]}px ${({ theme }) => theme.space[4]}px;
  position: relative;
`;

function App() {
  const initializeElevators = useElevatorStore(
    (state) => state.initializeElevators
  );

  useEffect(() => {
    // 3 lifta ka 2500ms
    initializeElevators(3, 10, 2500);
  }, [initializeElevators]);

  return (
    <AppContainer>
      <Header />
      <Main>
        <Building />
      </Main>
      <ControlPanel />
    </AppContainer>
  );
}

export default App;


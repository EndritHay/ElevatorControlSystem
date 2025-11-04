import React from 'react';
import styled from 'styled-components';
import { Floor } from './Floor';
import { ElevatorShaft } from './ElevatorShaft';
import { useElevatorStore } from '../stores/elevatorStore';
import { generateFloors } from '../utils/helpers';
import translator from '../i18n/translator';

const BuildingContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]}px;
  padding: ${({ theme }) => theme.space[6]}px;
  max-width: 1400px;
  margin: 0 auto;
`;

const FloorsColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const ElevatorsColumn = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]}px;
  padding: ${({ theme }) => theme.space[4]}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const BuildingTitle = styled.h2`
  position: absolute;
  top: ${({ theme }) => theme.space[6]}px;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${({ theme }) => theme.fontSizes[4]}px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.space[2]}px ${({ theme }) => theme.space[4]}px;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 100;
`;

export const Building: React.FC = () => {
  const t = translator.useT();
  const totalFloors = useElevatorStore((state) => state.totalFloors);
  const elevators = useElevatorStore((state) => state.elevators);
  const callElevator = useElevatorStore((state) => state.callElevator);

  const floors = generateFloors(totalFloors);
  const elevatorIds = Object.keys(elevators);

  const handleCallElevator = (floor: number) => {
    callElevator(floor);
  };

  return (
    <>
      <BuildingTitle>
        {t('building.floors', { count: totalFloors })} •{' '}
        {t('building.elevators', { count: elevatorIds.length })}
      </BuildingTitle>
      <BuildingContainer>
        <FloorsColumn>
          {floors.map((floorNumber) => (
            <Floor
              key={floorNumber}
              floorNumber={floorNumber}
              totalFloors={totalFloors}
              onCallElevator={handleCallElevator}
            />
          ))}
        </FloorsColumn>

        <ElevatorsColumn>
          {elevatorIds.map((elevatorId) => (
            <ElevatorShaft
              key={elevatorId}
              elevatorId={elevatorId}
              totalFloors={totalFloors}
            />
          ))}
        </ElevatorsColumn>
      </BuildingContainer>
    </>
  );
};


import React from 'react';
import styled from 'styled-components';
import { ElevatorCar } from './ElevatorCar';
import { useElevatorController } from '../hooks/useElevatorController';
import type { ElevatorId } from '../types';

interface ElevatorShaftProps {
  elevatorId: ElevatorId;
  totalFloors: number;
}

const ShaftContainer = styled.div<{ $height: number }>`
  position: relative;
  width: ${({ theme }) => theme.elevator.shaftWidth}px;
  height: ${({ $height }) => $height}px;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100px;
  }
`;

const ShaftBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    ${({ theme }) => theme.colors.border} 0px,
    ${({ theme }) => theme.colors.border} 1px,
    transparent 1px,
    transparent 100px
  );
  pointer-events: none;
`;

export const ElevatorShaft: React.FC<ElevatorShaftProps> = ({
  elevatorId,
  totalFloors,
}) => {
  const elevator = useElevatorController(elevatorId);
  const floorHeight = 100;
  const shaftHeight = totalFloors * floorHeight;

  if (!elevator) return null;

  return (
    <ShaftContainer $height={shaftHeight}>
      <ShaftBackground />
      <ElevatorCar elevator={elevator} totalFloors={totalFloors} />
    </ShaftContainer>
  );
};


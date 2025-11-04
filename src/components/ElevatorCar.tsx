import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { Elevator } from '../types';
import translator from '../i18n/translator';
import { formatQueue } from '../utils/helpers';

interface ElevatorCarProps {
  elevator: Elevator;
  totalFloors: number;
}

const CarContainer = styled(motion.div)<{ $yPosition: number }>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[2]}px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transform: translateY(${({ $yPosition }) => $yPosition}px);
  z-index: 10;
`;

const StatusIndicator = styled.div<{ $status: Elevator['status'] }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case 'moving':
        return theme.colors.elevator.moving;
      case 'doorOpen':
        return theme.colors.elevator.doorOpen;
      case 'stopped':
        return theme.colors.elevator.stopped;
      default:
        return theme.colors.elevator.idle;
    }
  }};
  box-shadow: 0 0 8px
    ${({ $status, theme }) => {
      switch ($status) {
        case 'moving':
          return theme.colors.elevator.moving;
        case 'doorOpen':
          return theme.colors.elevator.doorOpen;
        case 'stopped':
          return theme.colors.elevator.stopped;
        default:
          return theme.colors.elevator.idle;
      }
    }};
  animation: ${({ $status }) =>
    $status === 'moving' ? 'pulse 1s infinite' : 'none'};

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const ElevatorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]}px;
  width: 100%;
`;

const FloorDisplay = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const StatusText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[0]}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]}px;
`;

const QueueText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[0]}px;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ElevatorCar: React.FC<ElevatorCarProps> = ({
  elevator,
  totalFloors,
}) => {
  const t = translator.useT();

  // Calculate Y position based on current floor
  const floorHeight = 100; // Match theme.elevator.floorHeight
  const yPosition = (totalFloors - 1 - elevator.currentFloor) * floorHeight + 10;
  
  // Debug: Log position updates
  console.log(`[${elevator.id}] Render - Floor: ${elevator.currentFloor.toFixed(2)}, Y: ${yPosition}px`);

  const statusText = t(`elevator.status.${elevator.status}`);
  const queueDisplay = elevator.targetQueue.length
    ? formatQueue(elevator.targetQueue)
    : t('elevator.noQueue');

  return (
    <CarContainer
      $yPosition={yPosition}
      style={{
        transition: 'transform 0.1s linear',
      }}
      role="status"
      aria-label={`${t('elevator.title', {
        id: elevator.id,
      })} - ${t('elevator.currentFloor', {
        floor: Math.round(elevator.currentFloor),
      })}`}
    >
      <ElevatorInfo>
        <FloorDisplay>{Math.round(elevator.currentFloor)}</FloorDisplay>
        <StatusText>
          <StatusIndicator $status={elevator.status} />
          {statusText}
        </StatusText>
        {elevator.targetQueue.length > 0 && (
          <QueueText title={queueDisplay}>→ {queueDisplay}</QueueText>
        )}
      </ElevatorInfo>
    </CarContainer>
  );
};


import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import translator from '../i18n/translator';

interface FloorProps {
  floorNumber: number;
  totalFloors: number;
  onCallElevator: (floor: number) => void;
}

const FloorContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 0 ${({ theme }) => theme.space[4]}px;
  position: relative;
  gap: ${({ theme }) => theme.space[2]}px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceLight};
  }

  @media (max-width: 768px) {
    padding: 0 8px;
    height: 105px;
    gap: 4px;
  }
`;

const FloorNumber = styled.div`
  min-width: 60px;
  font-size: ${({ theme }) => theme.fontSizes[4]}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    min-width: 40px;
    font-size: 18px;
  }
`;

const FloorLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[1]}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: ${({ theme }) => theme.space[3]}px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CallButton = styled(Button)`
  margin-left: auto;
  min-width: 80px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    min-width: 70px;
    padding: 8px 10px;
    font-size: 13px;
  }
`;

export const Floor: React.FC<FloorProps> = ({
  floorNumber,
  totalFloors,
  onCallElevator,
}) => {
  const t = translator.useT();

  const handleCall = () => {
    onCallElevator(floorNumber);
  };

  return (
    <FloorContainer>
      <FloorNumber>{floorNumber}</FloorNumber>
      <FloorLabel>
        {t('floor.title', { number: floorNumber })}
      </FloorLabel>
      <CallButton
        variant="primary"
        size="md"
        onClick={handleCall}
        aria-label={t('floor.call')}
      >
        📞 {t('floor.call')}
      </CallButton>
    </FloorContainer>
  );
};


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

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const FloorNumber = styled.div`
  min-width: 60px;
  font-size: ${({ theme }) => theme.fontSizes[4]}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const FloorLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[1]}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: ${({ theme }) => theme.space[3]}px;
  flex: 1;
`;

const CallButton = styled(Button)`
  margin-left: auto;
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
        size="sm"
        onClick={handleCall}
        aria-label={t('floor.call')}
      >
        📞 {t('floor.call')}
      </CallButton>
    </FloorContainer>
  );
};


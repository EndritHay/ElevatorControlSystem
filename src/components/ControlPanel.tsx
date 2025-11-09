import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { useElevatorStore } from '../stores/elevatorStore';
import translator from '../i18n/translator';
import { downloadScreenshot } from '../utils/downloadImage';

const PanelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]}px;
  padding: ${({ theme }) => theme.space[5]}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.space[4]}px;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]}px;
  align-items: center;
`;

export const ControlPanel: React.FC = () => {
  const t = translator.useT();
  const resetAll = useElevatorStore((state) => state.resetAll);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all elevators? This will clear all queues.'
      )
    ) {
      resetAll();
    }
  };

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    try {
      await downloadScreenshot('root', 'elevator-system-snapshot.png');
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <PanelContainer>
      <ControlGroup>
        <Button variant="outline" onClick={handleReset}>
          🔄 {t('controls.reset')}
        </Button>
        <Button 
          variant="primary" 
          onClick={handleDownloadImage}
          disabled={isDownloading}
        >
          {isDownloading ? '⏳ Downloading...' : '📥 Download Image'}
        </Button>
      </ControlGroup>
    </PanelContainer>
  );
};


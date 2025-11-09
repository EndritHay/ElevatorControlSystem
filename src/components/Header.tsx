import React from 'react';
import styled from 'styled-components';
import translator from '../i18n/translator';
import { Button } from './Button';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space[5]}px ${({ theme }) => theme.space[6]}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.space[4]}px;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes[5]}px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]}px;
  align-items: center;
`;

const LanguageButton = styled(Button)`
  min-width: 60px;
`;

export const Header: React.FC = () => {
  const t = translator.useT();
  const [currentLang, setCurrentLang] = React.useState('en');

  const toggleLanguage = async () => {
    const newLang = currentLang === 'en' ? 'sq' : 'en';
    await translator.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <HeaderContainer>
      <Title>{t('app.title')}</Title>
      <Controls>
        <LanguageButton
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          title={t('controls.language')}
        >
          {currentLang.toUpperCase()}
        </LanguageButton>
      </Controls>
    </HeaderContainer>
  );
};


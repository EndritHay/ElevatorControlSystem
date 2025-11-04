import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

interface StyledButtonProps {
  $variant: 'primary' | 'secondary' | 'outline' | 'danger';
  $size: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]}px;
  padding: ${({ $size, theme }) => {
    if ($size === 'sm') return `${theme.space[2]}px ${theme.space[3]}px`;
    if ($size === 'lg') return `${theme.space[4]}px ${theme.space[6]}px`;
    return `${theme.space[3]}px ${theme.space[5]}px`;
  }};
  font-size: ${({ $size, theme }) => {
    if ($size === 'sm') return `${theme.fontSizes[0]}px`;
    if ($size === 'lg') return `${theme.fontSizes[2]}px`;
    return `${theme.fontSizes[1]}px`;
  }};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  background-color: ${({ $variant, theme }) => {
    if ($variant === 'secondary') return theme.colors.secondary;
    if ($variant === 'outline') return 'transparent';
    if ($variant === 'danger') return theme.colors.error;
    return theme.colors.primary;
  }};

  color: ${({ $variant, theme }) =>
    $variant === 'outline' ? theme.colors.primary : theme.colors.text};

  border: ${({ $variant, theme }) =>
    $variant === 'outline' ? `2px solid ${theme.colors.primary}` : 'none'};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  ...props
}) => {
  return (
    <StyledButton $variant={variant} $size={size} $fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
};


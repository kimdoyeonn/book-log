import { ReactNode } from 'react';
import styled from 'styled-components';

const Button = ({
  children,
  type,
  handleClick,
}: {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  handleClick?: () => void;
}) => {
  return (
    <CustomButton type={type} onClick={handleClick}>
      {children}
    </CustomButton>
  );
};

export default Button;

const CustomButton = styled.button`
  height: 2.5rem;
  width: 17rem;
  border: none;
  background: rgb(172, 185, 146);
  border-radius: 2px;
  font-weight: 600;

  cursor: pointer;
`;

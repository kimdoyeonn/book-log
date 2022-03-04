import styled from 'styled-components';

const Input = ({
  type,
  value,
  placeholder,
  handleChange,
}: {
  type: string;
  value: string;
  placeholder: string;
  handleChange: (e: any) => void;
}) => {
  return (
    <CustomInput
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default Input;

const CustomInput = styled.input`
  height: 2.5rem;
  width: 17rem;
  padding: 0.6rem 1rem;
  border: 1px solid rgb(0, 0, 0, 0.3);
  border-radius: 2px;
  outline: none;
`;

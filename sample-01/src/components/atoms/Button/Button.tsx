import styled, { css } from 'styled-components';

/** Types */
const primary = css`
  color: var(--white);
  background-color: var(--purple-300);
`;

/** Sizes */
const mid = css`
  width: 80px;
  height: 40px;
`;

const big = css`
  width: 180px;
  height: 50px;
`;

const sizes = { mid, big };

/** Prop Types */
interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  size?: 'mid' | 'big';
}

const ButtonStyle = styled.button<PropTypes>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-height: 40px;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  ${props => (props.primary ? primary : css`
    background-color: var(--white);
  `)};
  ${props => (props.size ? sizes[props.size] : '')};
`;

const Button: React.FC<PropTypes> = ({ children, ...props }) => (
  <ButtonStyle type="button" {...props}>
    {children}
  </ButtonStyle>
);


export default Button;

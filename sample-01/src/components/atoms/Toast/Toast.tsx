import styled from 'styled-components';
import { heavy, normal } from 'styles/fonts';

const ErrorIcon = styled.div`
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(/icons/ic-error-filled.svg);
  margin-right: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  ${normal};
  ${heavy};
  color: var(--white);
`;

const SuccessIcon = styled.div`
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(/icons/ic-success-filled.svg);
  margin-right: 16px;
`;

export const ErrorMessage = ({ message }: { message: string; }) => {
  return (
    <Wrapper>
      <ErrorIcon/> {message}
    </Wrapper>
  );
};

export const SuccessMessage = ({ message }: { message: string; }) => {
  return (
    <Wrapper>
      <SuccessIcon/> {message}
    </Wrapper>
  );
};


import styled from 'styled-components';

const StyledLogoMid = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 16px;
  background-color: var(--white);
  background-image: url(/icons/ic-logo-inverse-01.svg);
  background-repeat: no-repeat;
  background-position: center;
`;

const StyledLogoBig = styled.div`
  width: 180px;
  height: 40px;
  display: block;
  background: url(/icons/ic-logo-horizontal-purple-300.svg);
  margin-bottom: 24px;
`;

interface LogoProps { size: 'mid' | 'big'; }
const Logo = ({ size }: LogoProps) => {
  switch (size) {
    case 'big':
      return <StyledLogoBig />;
    case 'mid':
    default:
      return <StyledLogoMid />;
  }
};

export default Logo;

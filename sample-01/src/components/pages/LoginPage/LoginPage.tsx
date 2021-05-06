import SendbirdCalls from 'sendbird-calls';
import styled from 'styled-components';
import * as fonts from 'styles/fonts';
import * as mixins from 'styles/mixins';
import { media } from 'utils';

import Logo from 'components/atoms/Logo';
import LoginForm from 'components/organisms/LoginForm';
import Screen from 'components/templates/Screen';

import pack from '../../../../package.json';

const Wrapper = styled(Screen)`
  width: 100vw;
  height: 100vh;
  ${mixins.flexCenter};
  color: rgb(33, 34, 66);
  background-color: rgb(255, 255, 255);
  ${media.main} {
    background-color: rgb(246, 248, 252);
  }
`;

const Content = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  height: 100%;
  ${media.main} {
    height: auto;
    margin-top: 134px;
    margin-bottom: auto;
  }
`;

const Title = styled.div`
  ${fonts.big};
  ${fonts.demi};
  margin-bottom: 40px;
`;

const VersionInfo = styled.div`
  ${mixins.flexCenter};
  width: 100%;
  bottom: 24px;
  position: absolute;
  ${media.main} {
    display: none;
  }
`;

const VersionText = styled.div`
  ${fonts.small};
  margin-left: 8px;
  margin-right: 8px;
`;

const LoginPage = () => {
  return (
    <Wrapper>
      <Content>
        <Logo size="mid" />
        <Title>Sendbird Calls</Title>
        <LoginForm />
      </Content>
      <VersionInfo>
        <VersionText>Quickstart {pack.version}</VersionText>
        <VersionText>SDK {SendbirdCalls.sdkVersion}</VersionText>
      </VersionInfo>
    </Wrapper>
  )
}
export default LoginPage;

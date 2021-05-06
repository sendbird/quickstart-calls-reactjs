import styled from 'styled-components';
import { Helmet } from 'react-helmet'

import Widget from 'components/organisms/Widget';
import * as fonts from 'styles/fonts';
import * as mixins from 'styles/mixins';

const Wrapper = styled.div`
  ${mixins.fullScreen};
  ${mixins.flexCenter};
  ${mixins.bgWhite};
`;

const Logo = styled.img`
  display: block;
  width: 180px;
  height: 40px;
`;

const Title = styled.div`
  ${fonts.title};
  ${fonts.demi};
  text-align: center;
  margin-top: 24px;
`;

const Description = styled.div`
  ${fonts.normal};
  text-align: center;
  letter-spacing: -0.1px;
  color: var(--navy-600);
  margin-top: 16px;
`;

const Layout = styled.div`
  ${mixins.flexColumn};
  ${mixins.flexCenter};
`;

const ArrowDown = styled.img`
  display: block;
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin-top: 28px;
`;


interface WidgetViewProps {}
const WidgetView: React.FC<WidgetViewProps> = ({ children }) => (
  <Wrapper>
    <Helmet>
      <title>Sendbird Calls - Widget</title>
    </Helmet>
    <Layout>
      <Logo
        src="/icons/ic-logo-horizontal.svg"
        alt="Sendbird horizontal logo svg icon"
      />
      <Title>Sendbird Calls Quickstart</Title>
      <Description>
        This is the Sendbird Calls Quickstart page.<br />
        To try our widget, please click the button below.
      </Description>
      <ArrowDown
        src="/icons/ic-arrow-down-right-24.svg"
        alt="arrow-down-right"
      />
    </Layout>
    <Widget>
      {children}
    </Widget>
  </Wrapper>
);

export default WidgetView;

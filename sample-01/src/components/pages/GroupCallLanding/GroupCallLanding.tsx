import styled from 'styled-components';
import * as mixins from 'styles/mixins';
import ChoicesTemp from '../../templates/Choices';

const Wrapper = styled.div`
  ${mixins.fullScreen};
  ${mixins.bgWhite};
  padding: 33px;
`;

const Logo = styled.img`
  display: block;
  width: 122px;
  height: 27px;
`;

const GroupCallLanding = () => {

  return (
    <Wrapper>
      <Logo
        src="/icons/ic-logo-horizontal.svg"
        alt="Sendbird horizontal logo svg icon"
      />
      <ChoicesTemp
        hasBack
        title="Group calls"
        desc="Choose a quickstart app type"
        choices={[{
          to: 'full-screen',
          title: 'Full-screen',
          desc: 'The full-screen type allows you to make calls without any installation on your browser.'
        }, {
          to: 'widget',
          title: 'Widget',
          desc: 'The widget type allows you to make calls on your existing web application. '
        }]}
      />
    </Wrapper>
  );
}

export default GroupCallLanding;

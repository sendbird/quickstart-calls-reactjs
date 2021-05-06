import styled from 'styled-components';
import type { DirectCallOption } from 'sendbird-calls';

import { AudioDialButton, VideoDialButton } from 'components/atoms/CallButtons';
import { useTextInput } from 'components/atoms/Input';
import { useSbCalls } from 'lib/sendbird-calls';
import * as fonts from 'styles/fonts';
import * as mixins from 'styles/mixins';
import { media } from 'utils';

const Wrapper = styled.div`

`;

const FormContainer = styled.div`
  ${mixins.flexCenter};
  width: 312px;
  flex-direction: column;
  box-sizing: border-box;
  border: none;
  
  ${media.main} {
    background-color: var(--white);
  }
`;

const Title = styled.div`
  ${fonts.big};
  ${fonts.demi};
  margin-bottom: 16px;
`;

const Description = styled.div`
  ${fonts.normal};
  ${fonts.heavy};
  color: rgb(138, 146, 186);
  height: 40px;
  text-align: center;
  margin-bottom: 32px;
  letter-spacing: -0.1px;
`;

const ButtonsGroup = styled.div`
  ${mixins.flexCenter};
  margin-top: 16px;
`;

function getCallOption(callOption?: DirectCallOption) {
  return {
    localMediaView: undefined,
    remoteMediaView: undefined,
    videoEnabled: true,
    audioEnabled: true,
    ...callOption,
  };
}


interface DialViewProps {}
const DialView: React.FC<DialViewProps> = props => {
  const sbCall = useSbCalls();
  const [userId, userIdInput] = useTextInput({ id: 'userIdInput', initValue: '', placeholder: 'Enter user ID' });
  const dial = (isVideoCall: boolean) => {
    sbCall.dial({ userId, isVideoCall, callOption: getCallOption({}) });
  };

  return (
    <Wrapper>
      <FormContainer>
        <Title className="">Make a call</Title>
        {userIdInput}

        <ButtonsGroup>
          <VideoDialButton onClick={() => dial(true)} />
          <AudioDialButton onClick={() => dial(false)} />
        </ButtonsGroup>
      </FormContainer>
    </Wrapper>
  );
};

export default DialView;

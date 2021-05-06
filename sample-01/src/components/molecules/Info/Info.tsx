import type { StatefulRoom } from 'lib/sendbird-calls';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { demi, normal, small, heavy } from 'styles/fonts';
import { flexCenter } from 'styles/mixins';
import { SuccessMessage } from "../../atoms/Toast";

const RoomIdWrapper = styled.div`
  &>div {
    margin-top: 6px;
    display: flex;
    width: 100%;
  }
`;

export const InfoLabel = styled.label`
  ${small};
  ${heavy};
  color: var(--navy-900);
`;

export const InfoInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px;
  background-color: var(--navy-80);
  border-radius: 4px;
  margin-top: 6px;
`;

export const InfoInputText = styled.div`
  ${normal};
  letter-spacing: -0.1px;
  color: var(--navy-600);
`;

export const InfoInputIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(/icons/ic-copy.svg);
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

export const CopyButton = styled.div`
  width: 80px;
  height: 40px;
  border-radius: 4px;
  padding: 10px 16px;
  background-color: var(--purple-300);
  ${flexCenter};
  ${normal};
  color: var(--white);
  cursor: pointer;
  ${demi};
  margin-left: 8px;
  margin-top: 6px;
`;

export const InputWithCopyButton = ({ text, title }: { text: string; title: string; }) => {
  return (
    <RoomIdWrapper>
      <InfoLabel>{title}</InfoLabel>
      <div>
        <InfoInput>
          <InfoInputText>
            {text}
          </InfoInputText>
        </InfoInput>
        <CopyButton onClick={() => {
          copy(text);
          toast.success(<SuccessMessage message={'Room ID copied.'}/>, { autoClose: 2000, });
        }}>
          Copy
        </CopyButton>
      </div>
    </RoomIdWrapper>
  )
}

export const InputWithCopyIcon = ({ title, text, icon = true }: { title: string, text: string; icon?: boolean; }) => {
  return (
    <RoomIdWrapper>
      <InfoLabel>{title}</InfoLabel>
      <InfoInput>
        <InfoInputText>
          {text}
        </InfoInputText>
        {icon && <InfoInputIcon onClick={() => {
          copy(text);
          toast.success(<SuccessMessage message={'Room ID copied.'}/>, { autoClose: 2000, });
        }}/>}
      </InfoInput>
    </RoomIdWrapper>
  )
}

const RoomCreatorWrapper = styled.div`
  
`;
export const RoomCreatorInfo = ({ room }: { room: StatefulRoom }) => {
  return (
    <RoomCreatorWrapper>
      <label>Created by</label>
      <div>
        <img src={room.createdBy} />
      </div>
    </RoomCreatorWrapper>
  )
}

import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Input, { useTextInput } from 'components/atoms/Input';
import Overlay from 'components/atoms/Overlay';
import { ErrorMessage } from 'components/atoms/Toast';
import GroupCall from 'components/organisms/GroupCall';
import Preview from 'components/organisms/Preview';
import Header from 'components/organisms/Header';
import RoomCreated from 'components/organisms/RoomCreated';
import { useSbCalls } from 'lib/sendbird-calls';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FullScreen, FullScreenContent } from 'components/templates/Screen';
import * as fonts from 'styles/fonts';
import { toast } from 'react-toastify';
import { useLocation } from "react-use";

const Wrapper = styled(FullScreen)`
`;

const Content = styled(FullScreenContent)`
  width: 688px;
`

const Title = styled.div`
  ${fonts.big};
  ${fonts.demi};
  margin-bottom: 16px;
`;

const Description = styled.div`
  ${fonts.normal};
  ${fonts.heavy};
  color: var(--navy-600);
  height: 20px;
  text-align: center;
  margin-bottom: 48px;
  letter-spacing: -0.1px;
`;

const Boxes = styled.div`
  display: flex;
`;

const FormBox = styled.div`
  width: 336px;
  height: 248px;
  padding: 32px;
  margin-right: 16px;
  &:last-child {
    margin-right: 0;
  }
  border-radius: 4px;
  border: solid 1px var(--navy-100);
  background-color: var(--white);
`;

const FormBoxIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  margin-bottom: 16px;
`

const FormBoxTitle = styled.div`
  ${fonts.midBig};
  ${fonts.demi};
  color: var(--navy-900);
  margin-bottom: 8px;
`;

const FormBoxDescription = styled.div`
  ${fonts.normal};
  color: var(--navy-900);
  margin-bottom: 32px;
`

const FormButton = styled(Button)`
  ${fonts.normal};
  ${fonts.demi};
  color: var(--white);
  width: 100%;
`

const TextButton = styled.div<{ disabled: boolean; }>`
  ${fonts.normal};
  ${fonts.demi};
  color: var(--purple-300);
  height: 20px;
  text-align: center;
  cursor: pointer;
  margin-left: 16px;
  ${props => props.disabled ? 'color: var(--navy-300);' : ''};
`
const FormInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  ${Input} {
    
  }
`

const GroupCallMain = () => {
  const sbCalls  = useSbCalls();
  const query = new URLSearchParams(useLocation().search);
  const roomIdQuery = query.get('room_id');
  const { rooms } = sbCalls;
  const [roomId, roomIdInput, setRoomId] = useTextInput({ id: 'roomIdInput', initValue: '', placeholder: 'Room ID' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRoomCreated, setShowRoomCreated] = useState(false);

  useEffect(() => {
    const room = rooms[rooms.length - 1];
  }, [rooms]);

  useEffect(() => {
    if (roomIdQuery) {
      enter(roomIdQuery, true);
    }
  }, [])

  const onCall = useMemo(() => {
    return rooms.find(r => !!r.localParticipant);
  }, [rooms]);

  const enter = useCallback(async (roomId: string, skipDialog: boolean) => {
    try {
      const room = await sbCalls.fetchRoomById(roomId);

      if (skipDialog) {
        room.enter({
          audioEnabled: true,
          videoEnabled: true,
        }).catch(error => {
          toast.error(<ErrorMessage message={error.message} />, { autoClose: 2000 });
        })
      } else {
        setIsModalOpen(true);
      }
    } catch (e) {
      console.error(e);
      toast.error(<ErrorMessage message={e.message || `Check room ID and try again.`} />, { autoClose: 2000 });
    }
  }, [sbCalls])

  const createRoom = useCallback(() => {
    sbCalls.createRoom({ roomType: sbCalls.RoomType.SMALL_ROOM_FOR_VIDEO })
      .then(room => {
        return room.enter({
          audioEnabled: true,
          videoEnabled: true,
        });
      })
      .then(() => {
        setShowRoomCreated(true);
      })
      .catch(e => {
        toast.error(<ErrorMessage message={e.message} />, { autoClose: 2000 });
      })
  }, [sbCalls]);

  // console.log(rooms);
  console.log(JSON.stringify(rooms[rooms.length - 1], null, 4));
  // console.log({ onCall });


  return (
    <Wrapper>
      <Header />
      <Content>
        <Title className="">Make a group call</Title>
        <Description>Sendbird Calls now provides Rooms where multiple users can come into a room for a group call. </Description>
        <Boxes>
          <FormBox>
            <FormBoxIcon src="/icons/ic-add-room.svg" />
            <FormBoxTitle>Create a room</FormBoxTitle>
            <FormBoxDescription>Start a group call in a room and share the room ID with others.</FormBoxDescription>
            <FormButton primary size="mid" onClick={() => { createRoom() }}>Create</FormButton>
          </FormBox>
          <FormBox>
            <FormBoxIcon src="/icons/icon-join.svg" />
            <FormBoxTitle>Enter with room ID</FormBoxTitle>
            <FormBoxDescription>Enter an existing room to participate in a group call.</FormBoxDescription>
            <FormInput>
              {roomIdInput}
              <TextButton onClick={() => { enter(roomId, false) }} disabled={!roomId}>Enter</TextButton>
            </FormInput>
          </FormBox>
        </Boxes>
        <Preview
          isOpen={isModalOpen}
          room={rooms[rooms.length - 1]}
          close={() => setIsModalOpen(false)}
          contentLabel="Preview"
        />
        {onCall &&
          <Overlay>
            <GroupCall room={onCall} />
            <RoomCreated
              isOpen={showRoomCreated}
              room={onCall}
              close={() => setShowRoomCreated(false)}
            />
          </Overlay>
        }
      </Content>
    </Wrapper>
  )
}

export default GroupCallMain;

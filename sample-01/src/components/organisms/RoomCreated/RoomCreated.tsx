import { InfoLabel, InputWithCopyButton, InputWithCopyIcon } from 'components/molecules/Info';
import { StatefulRoom } from 'lib/sendbird-calls/SbCallsContext';
import ReactModal from 'react-modal';
import React from 'react';

import Modal from 'components/templates/Modal';
import styled from 'styled-components';
import { normal } from 'styles/fonts';

const Text = styled.div`
  ${normal};
  letter-spacing: -0.1px;
  color: var(--navy-900);
  margin-bottom: 30px;
`;

const RoomCreated = (props: ReactModal.Props & { close: () => void; room: StatefulRoom; }) => {
  return (
    <Modal
      title="Room created!"
      content={(
        <React.Fragment>
          <Text>Share the room ID for others to enter this room for group calls.</Text>
          <InputWithCopyButton text={props.room.roomId} title="Room ID" />
        </React.Fragment>
      )}
      footer={{}}
      {...props}
    />
  )
};

const CreatedByText = styled.div`
  ${normal};
  letter-spacing: -0.1px;
  color: var(--navy-900);
  margin-top: 10px;
`;

export const RoomInfo = (props: ReactModal.Props & { close: () => void; room: StatefulRoom; }) => {
  return (
    <Modal
      title="Room information"
      content={(
        <React.Fragment>
          <InputWithCopyIcon title="Room ID" text={props.room.roomId} />
          <div style={{ marginTop: 24 }}>
            <InfoLabel>Created by</InfoLabel>
            <CreatedByText>User ID : {props.room.createdBy}</CreatedByText>
          </div>
        </React.Fragment>
      )}
      footer={{
        confirm: { label: 'OK', onClick: () => { props.close() } }
      }}
      {...props}
    />
  )
}

export default RoomCreated;

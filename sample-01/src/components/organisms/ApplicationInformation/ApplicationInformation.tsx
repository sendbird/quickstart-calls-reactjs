import { InputWithCopyButton, InputWithCopyIcon } from 'components/molecules/Info';
import ReactModal from 'react-modal';
import React from 'react';

import Modal from 'components/templates/Modal';
import { appId, currentUser } from 'sendbird-calls';
import styled from 'styled-components';
import { normal } from 'styles/fonts';

const Text = styled.div`
  ${normal};
  letter-spacing: -0.1px;
  color: var(--navy-900);
  margin-bottom: 30px;
`;

const ApplicationInformation = (props: ReactModal.Props & { close: () => void; }) => {
  return (
    <Modal
      title="Application Information"
      content={(
        <React.Fragment>
          <InputWithCopyIcon text={currentUser.userId} title="Name" icon={false} />
          <div style={{ height: '22px' }}/>
          <InputWithCopyIcon text={appId} title="ID"/>
        </React.Fragment>
      )}
      footer={{}}
      {...props}
    />
  );
};

export default ApplicationInformation;


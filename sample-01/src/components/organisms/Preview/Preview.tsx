import { Avatar, ParticipantOverlay } from 'components/organisms/GroupCall/MediaContent';
import React from 'react';
import SendbirdCall, { useSbCalls, StatefulRoom } from 'lib/sendbird-calls';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from 'components/templates/Modal';
import ReactModal from 'react-modal';
import { heavy, normal } from 'styles/fonts';
import { toast } from "react-toastify";
import { ErrorMessage } from "../../atoms/Toast";

const VideoBox = styled.div<{ height: number; }>`
  position: relative;
  width: 432px;
  height: ${props => props.height}px;
  margin-bottom: 17px;
  background-color: var(--navy-800);
  video {
    width: 100%;
    height: 100%;
  }
`

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  ${normal};
  ${heavy};
  color: var(--navy-900);
  cursor: pointer;
  input {
    width: 18px;
    height: 18px;
    margin-right: 9px;
  }
  margin-bottom: 10px;
`

const CheckBox = styled.div<{ selected: boolean; }>`
  width: 20px;
  height: 20px;
  margin: 0 8px 0 0;
  padding: 1px;
  object-fit: contain;
  background-image: url(${props => props.selected ? '/icons/icon-checkbox-selected.svg' : '/icons/icon-checkbox-unselected.svg'});
  background-repeat: no-repeat;
  background-position: center center;
`;

const Preview = (props: ReactModal.Props & { close: () => void; room: StatefulRoom }) => {
  const sbCalls = useSbCalls();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [videoHeight, setVideoHeight] = useState(243);

  useEffect(() => {
    if (!props.isOpen || !videoEnabled) return () => {};
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const mediaAccess = SendbirdCall.useMedia({ audio: true, video: videoEnabled })

    // @ts-ignore
    mediaAccess.on('streamChanged', (stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });

    return () => {
      if (videoRef.current) videoRef.current.srcObject = null;
      mediaAccess?.dispose();
    }
  }, [props.isOpen, videoEnabled]);

  useEffect(() => {
    if (!videoRef.current) return;
    setVideoHeight(Math.max(videoRef.current.offsetHeight, videoHeight));
  }, [videoHeight, videoEnabled])

  const enter = () => {
    props.close();
    props.room.enter({
      audioEnabled,
      videoEnabled,
    }).catch(error => {
      toast.error(<ErrorMessage message={error.message} />, { autoClose: 2000 });
    })
  }
  return (
    <Modal
      title="Enter room"
      content={(
        <React.Fragment>
          <VideoBox height={videoHeight}>
            <video ref={videoRef} autoPlay playsInline muted={!audioEnabled} />
            {videoEnabled ||
              <ParticipantOverlay>
                <Avatar url={sbCalls.user?.profileUrl} />
              </ParticipantOverlay>
            }
          </VideoBox>

          <CheckBoxWrapper onClick={() => setAudioEnabled(!audioEnabled)}>
            <CheckBox selected={!audioEnabled}/>
            Mute my audio
          </CheckBoxWrapper>
          <CheckBoxWrapper onClick={() => setVideoEnabled(!videoEnabled)}>
            <CheckBox selected={!videoEnabled}/>
            Turn off my video
          </CheckBoxWrapper>
          <div style={{ height: '22px' }}/>
        </React.Fragment>
      )}
      footer={{
        cancel: { label: 'Cancel' },
        confirm: { label: 'Enter', onClick: enter }
      }}
      {...props}
    />
  );
};

export default Preview;

import { useSbCalls } from 'lib/sendbird-calls/SbCallsContext';
import { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'components/templates/Modal';
import ReactModal from 'react-modal';
import { small, normal, heavy } from 'styles/fonts';

const Wrapper = styled.div`
  
`;

const SelectContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 22px;
  background-color: var(--white);
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SelectLabel = styled.label`
  ${small};
  ${heavy};
  display: inline-block;
  height: 12px;
  margin-bottom: 6px;
`;

const Select = styled.select`
  ${normal};
  ${heavy};
  appearance: none;
  width: 100%;
  height: 40px;
  padding: 10px 36px 10px 16px;
  border-radius: 4px;
  border: solid 1px var(--navy-200);
  background-color: var(--white);
  background-image: url(/icons/ic-input-arrow-down.svg);
  background-repeat: no-repeat;
  background-position: calc(100% - 12px) center;
`;

const DeviceSettings = (props: ReactModal.Props & { close: () => void; title?: string; }) => {
  const sbCalls = useSbCalls();

  useEffect(() => {
    if (props.isOpen) sbCalls.updateMediaDevices({ audio: true, video: true });
  }, []);

  return (
    <Modal
      shouldCloseOnOverlayClick
      title="Settings"
      content={(
        <Fragment>
          <SelectContainer>
            <SelectLabel htmlFor="camera-select">Camera</SelectLabel>
            <Select
              id="camera-select"
              defaultValue={sbCalls.videoInputDeviceInfo.current?.deviceId}
              onChange={e => {
                const { value } = e.target;
                const mediaInfo = sbCalls.videoInputDeviceInfo.available.find(device => device.deviceId === value);
                if (mediaInfo) sbCalls.selectVideoInputDevice(mediaInfo);
              }}
            >
              {sbCalls.videoInputDeviceInfo.available.map(info => (
                <option key={info.deviceId} value={info.deviceId}>{info.label}</option>
              ))}
            </Select>
          </SelectContainer>

          <SelectContainer>
            <SelectLabel htmlFor="microphone-select">Microphone</SelectLabel>
            <Select
              id="microphone-select"
              defaultValue={sbCalls.audioInputDeviceInfo.current?.deviceId}
              onChange={e => {
                const { value } = e.target;
                const mediaInfo = sbCalls.audioInputDeviceInfo.available.find(device => device.deviceId === value);
                if (mediaInfo) sbCalls.selectAudioInputDevice(mediaInfo);
              }}
            >
              {sbCalls.audioInputDeviceInfo.available.map(info => (
                <option key={info.deviceId} value={info.deviceId}>{info.label}</option>
              ))}
            </Select>
          </SelectContainer>

          <SelectContainer>
            <SelectLabel htmlFor="speaker-select">Speaker</SelectLabel>
            <Select
              id="speaker-select"
              defaultValue={sbCalls.audioOutputDeviceInfo.current?.deviceId}
              onChange={e => {
                const { value } = e.target;
                const mediaInfo = sbCalls.audioOutputDeviceInfo.available.find(device => device.deviceId === value);
                if (mediaInfo) sbCalls.selectAudioOutputDevice(mediaInfo);
              }}
            >
              {sbCalls.audioOutputDeviceInfo.available.map(info => (
                <option key={info.deviceId} value={info.deviceId}>{info.label}</option>
              ))}
            </Select>
          </SelectContainer>
        </Fragment>
      )}
      footer={{}}
      {...props}
    />
  );
};

export default DeviceSettings;

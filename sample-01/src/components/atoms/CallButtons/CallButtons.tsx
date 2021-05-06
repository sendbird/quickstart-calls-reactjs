import styled from 'styled-components';

import ButtonCircle from 'components/atoms/ButtonCircle';

export const CallButton = styled(ButtonCircle)`
  margin: 0 10px;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const DialButton = styled(ButtonCircle)`
  margin: 0 10px;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid var(--purple-300);
`;

export const VideoDialButton = styled(DialButton)`
  background-image: url(/icons/ic-video-thumbnail-purple.svg);
`;

export const AudioDialButton = styled(DialButton)`
  background-color: var(--purple-300);
  background-image: url(/icons/ic-callkit-audio-20.svg);
`;


export const VideoCallAcceptButton = styled(CallButton)`
  background-color: #2eba9f;
  background-image: url(/icons/icon-call-video.svg);
  &:hover {
    background-color: #007a7a;
  }
`;

export const AudioCallAcceptButton = styled(CallButton)`
  background-color: #2eba9f;
  background-image: url(/icons/ic-callkit-audio.svg);
  &:hover {
    background-color: #007a7a;
  }
`;

export const MuteButton = styled(CallButton)`
  background-color: rgba(168, 168, 168, 0.38);
  background-image: url(/icons/ic-callkit-audio-off-white.svg);
  &:hover {
    background-color: rgba(168, 168, 168, 0.5);
  }
`;

export const UnmuteButton = styled(CallButton)`
  background-color: var(--white);
  background-image: url(/icons/ic-callkit-audio-off-black.svg);
  &:hover {
    background-color: rgba(168, 168, 168, 0.5);
  }
`;

export const StopVideoButton = styled(CallButton)`
  background-color: rgba(168, 168, 168, 0.38);
  background-image: url(/icons/ic-video-thumbnail-white.svg);
  &:hover {
    background-color: rgba(168, 168, 168, 0.5);
  }
`;

export const StartVideoButton = styled(CallButton)`
  background-color: var(--white);
  background-image: url(/icons/ic-video-thumbnail-black.svg);
  &:hover {
    background-color: rgba(168, 168, 168, 0.5);
  }
`;

export const EndButton = styled(CallButton)`
  background-size: 32px;
  background-color: #e53157;
  background-image: url(/icons/ic-callkit-end.svg);
  &:hover {
    background-color: #a30e2d;
  }
`;

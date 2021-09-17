import type { StatefulRoom } from 'lib/sendbird-calls/SbCallsContext';
import styled, { css } from 'styled-components';
import { normal } from 'styles/fonts';
import { useEffect, useState } from "react";

const ParticipantsRow = styled.div<{ rows: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: ${props => Math.ceil(100 / props.rows) + '%'};
  margin-bottom: 4px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const ParticipantView = styled.div<{ rows: number, width: number, height: number, isLocal?: boolean }>`
  position: relative;
  width: ${props => Math.min((props.height - 184) / props.rows * (16 / 9), (props.width - 32) / 2) + 'px'};
  height: 100%;
  background-color: var(--navy-800);
  &:first-child {
    margin-right: 4px;
  }
  &:before {
    display: block;
    content: "";
    padding-top: 56.25%;  /*What you want the height to be in relation to the width*/
  }
  video {
    position:  absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const ParticipantInfo = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 24px;
  padding: 2px 8px;
  background-color: rgba(33, 34, 66, 0.7);
  ${normal};
  color: var(--white);
`;

export const ParticipantOverlay = styled.div<{ fillBlack?: boolean; }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: var(--navy-800);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  ${props => props.fillBlack ? css`
    background-color: black;

` : ''};
`;

export const Avatar = styled.div<{ url?: string; }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  background-image: url(${props => props.url ? props.url : '/icons/icon-avatar.svg'});
`;

const ParticipantMutedIcon = styled.div`
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(/icons/icon-audio-off.svg);
  margin-right: 4px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  max-height: calc(100vh - 64px - 88px);
  padding: 16px;
  > ${ParticipantView} {
    width: 100%;
  }
`;


type Props = { room: StatefulRoom };
const MediaContent = ({ room }: Props) => {
  const { participants, localParticipant, remoteParticipants } = room;

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
  }, []);

  console.log(
    JSON.stringify(
    participants.map(x => ({ id: x.participantId, audio: x.isAudioEnabled }))
      ,null,4)
  )

  if (!remoteParticipants.length) {
    const p = localParticipant;
    return (
      <Wrapper>
        <ParticipantView key={p.participantId} rows={1} width={windowDimensions.width} height={windowDimensions.height}>
          <video autoPlay playsInline muted={p.participantId === localParticipant.participantId} ref={el => {
            if (!el) return;
            p.setMediaView(el);
          }} />
          {p.isVideoEnabled ||
          <ParticipantOverlay>
            <Avatar url={p.user.profileUrl} />
          </ParticipantOverlay>
          }
          <ParticipantInfo>
            {p.isAudioEnabled || <ParticipantMutedIcon />}User ID: {p.user.userId}
          </ParticipantInfo>
        </ParticipantView>
      </Wrapper>
    )
  }

  const rows = Math.ceil(participants.length / 2);
  return (
    <Wrapper>
      {Array(rows).fill(0).map((x, i) => {
        const p1 = participants[i * 2];
        const p2 = participants[i * 2 + 1];

        return (
          <ParticipantsRow key={i} rows={rows}>
            {[p1, p2].map(p => (
              p && (
                <ParticipantView rows={rows} width={windowDimensions.width} height={windowDimensions.height} key={p.participantId}>
                  <video autoPlay playsInline muted={p.participantId === localParticipant.participantId} ref={el => {
                    if (!el) return;
                    p.setMediaView(el);
                  }} />
                  {p.isVideoEnabled ||
                  <ParticipantOverlay>
                    <Avatar url={p.user.profileUrl} />
                  </ParticipantOverlay>
                  }
                  <ParticipantInfo>
                    {p.isAudioEnabled || <ParticipantMutedIcon />}User ID: {p.user.userId}
                  </ParticipantInfo>
                </ParticipantView>
              )
            ))}
          </ParticipantsRow>
        )
      })}
    </Wrapper>
  )
}
export default MediaContent;

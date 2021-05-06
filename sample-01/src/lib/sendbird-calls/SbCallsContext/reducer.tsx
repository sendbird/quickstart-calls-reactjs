import { castDraft, produce } from 'immer';

import type { State } from './state';
import { initialState } from './state';
import type {
  StatefulDirectCall,
  StatefulRoom,
  AudioInputDeviceInfo,
  AudioOutputDeviceInfo,
  VideoInputDeviceInfo,
  StatefulLocalParticipant,
  StatefulRemoteParticipant,
} from './types';
import type { User as SBUser } from 'sendbird-calls';

/** Actions */
export type Action =
  | { type: 'AUTH'; payload: SBUser; }
  | { type: 'DEAUTH'; }
  | { type: 'ADD_CALL'; payload: StatefulDirectCall; }
  | { type: 'RINGING'; payload: StatefulDirectCall; }
  | { type: 'UPDATE_CALL', payload: Partial<StatefulDirectCall>; }
  | { type: 'CLEAR_CALLS'; }
  | { type: 'ADD_ROOM'; payload: StatefulRoom; }
  | { type: 'UPDATE_ROOM', payload: Partial<StatefulRoom>; }
  | { type: 'UPDATE_ROOM_LOCAL_PARTICIPANT', payload: { roomId: string; participant: Partial<StatefulLocalParticipant>; }; }
  | { type: 'UPSERT_ROOM_REMOTE_PARTICIPANT', payload: { roomId: string; participant: Partial<StatefulRemoteParticipant>; }; }
  | { type: 'DELETE_ROOM_REMOTE_PARTICIPANT', payload: { roomId: string; participantId: string; }; }
  | { type: 'CLEAR_ROOMS'; }
  | { type: 'UPDATE_AUDIO_INPUT_DEVICE_INFO'; payload: Partial<AudioInputDeviceInfo>; }
  | { type: 'UPDATE_AUDIO_OUTPUT_DEVICE_INFO'; payload: Partial<AudioOutputDeviceInfo>; }
  | { type: 'UPDATE_VIDEO_INPUT_DEVICE_INFO'; payload: Partial<VideoInputDeviceInfo>; }

/** Reducer */
export const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case 'AUTH':
      return produce(prevState, draft => {
        draft.user = action.payload;
      });
    case 'DEAUTH':
      return initialState;
    case 'ADD_CALL':
      return produce(prevState, draft => {
        draft.calls.push(castDraft(action.payload));
      });
    case 'RINGING': {
      const isBusy = prevState.calls.some(call => !call.isEnded);
      const call = action.payload;
      if (isBusy) {
        call.end();
      }
      return produce(prevState, draft => {
        draft.calls.push(castDraft(call));
      });
    }
    case 'UPDATE_CALL':
      return produce(prevState, draft => {
        const index = draft.calls.findIndex(c => c.callId === action.payload.callId);
        if (index === -1) return;
        Object.assign(draft.calls[index], castDraft(action.payload));
      });
    case 'CLEAR_CALLS':
      return produce(prevState, draft => {
        draft.calls = castDraft(initialState.calls);
      });
    case 'ADD_ROOM':
      return produce(prevState, draft => {
        draft.rooms.push(castDraft(action.payload));
      });
    case 'UPDATE_ROOM':
      return produce(prevState, draft => {
        const index = draft.rooms.findIndex(c => c.roomId === action.payload.roomId);
        if (index === -1) return;
        Object.assign(draft.rooms[index], castDraft(action.payload));
      });
    case 'UPDATE_ROOM_LOCAL_PARTICIPANT':
      return produce(prevState, draft => {
        const { roomId, participant } = action.payload;
        const room = draft.rooms.find(c => c.roomId === roomId);
        if (!room) return;

        const pIndex = room.participants.findIndex(p => p.participantId === room.localParticipant.participantId);

        Object.assign(room.localParticipant, castDraft(participant));
        Object.assign(room.participants[pIndex], castDraft(participant));
      });
    case 'UPSERT_ROOM_REMOTE_PARTICIPANT':
      return produce(prevState, draft => {
        const { roomId, participant } = action.payload;
        const room = draft.rooms.find(c => c.roomId === roomId);
        if (!room) return;

        const index = room.remoteParticipants.findIndex(p => p.participantId === participant.participantId);
        const pIndex = room.participants.findIndex(p => p.participantId === participant.participantId);
        if (index === -1) {
          const srp = castDraft(participant as StatefulRemoteParticipant);
          room.remoteParticipants.push(srp);
          room.participants.push(srp);
          return;
        }

        Object.assign(room.remoteParticipants[index], castDraft(participant));
        Object.assign(room.participants[pIndex], castDraft(participant));
      });
    case 'DELETE_ROOM_REMOTE_PARTICIPANT':
      return produce(prevState, draft => {
        const { roomId, participantId } = action.payload;
        const room = draft.rooms.find(c => c.roomId === roomId);
        if (!room) return;

        const index = room.remoteParticipants.findIndex(p => p.participantId === participantId);
        if (index === -1) return;
        room.remoteParticipants.splice(index, 1);

        const pIndex = room.participants.findIndex(p => p.participantId === participantId);
        if (index === -1) return;
        room.participants.splice(pIndex, 1);
      });
    case 'CLEAR_ROOMS':
      return produce(prevState, draft => {
        draft.rooms = castDraft(initialState.rooms);
      });
    case 'UPDATE_AUDIO_INPUT_DEVICE_INFO':
      return produce(prevState, draft => {
        draft.audioInputDeviceInfo = { ...prevState.audioInputDeviceInfo, ...action.payload };
      });
    case 'UPDATE_AUDIO_OUTPUT_DEVICE_INFO':
      return produce(prevState, draft => {
        draft.audioOutputDeviceInfo = { ...prevState.audioOutputDeviceInfo, ...action.payload };
      });
    case 'UPDATE_VIDEO_INPUT_DEVICE_INFO':
      return produce(prevState, draft => {
        draft.videoInputDeviceInfo = { ...prevState.videoInputDeviceInfo, ...action.payload };
      });
    default:
      return prevState;
  }
};

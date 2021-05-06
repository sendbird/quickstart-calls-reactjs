import { createContext } from 'react';

import { State, initialState } from './state';
import type { StatefulDirectCall, StatefulRoom } from './types';
import SendbirdCall, { RoomParams, RoomType } from 'sendbird-calls';
import type { DialParams } from 'sendbird-calls';

/** Context */
export type ContextType = State & {
  isAuthenticated: boolean;
  init: (appId: string) => void;
  auth: typeof SendbirdCall.authenticate; // TODO: Stateful SbUser
  deauth: () => void;

  // Media Device Control
  updateMediaDevices: (constraints: { audio: boolean; video: boolean; }) => void;
  selectAudioInputDevice: (deviceInfo: InputDeviceInfo) => void;
  selectAudioOutputDevice: (deviceInfo: MediaDeviceInfo) => void;
  selectVideoInputDevice: (deviceInfo: InputDeviceInfo) => void;

  // Direct Calls
  isBusy: boolean;
  currentCall?: StatefulDirectCall;
  dial: (params: DialParams) => Promise<StatefulDirectCall>;
  addDirectCallSound: typeof SendbirdCall.addDirectCallSound;
  clearCalls: () => void;

  // Rooms
  createRoom: (options: RoomParams) => Promise<StatefulRoom>,
  getCachedRoomById: (roomId: string) => StatefulRoom | undefined,
  fetchRoomById: (roomId: string) => Promise<StatefulRoom>,
  RoomType: typeof RoomType,
};

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <AuthContext>.');
};

export const initialContext: ContextType = {
  ...initialState,
  isAuthenticated: false,
  init: stub,
  auth: stub,
  deauth: stub,

  // Media Device Control
  updateMediaDevices: stub,
  selectAudioInputDevice: stub,
  selectAudioOutputDevice: stub,
  selectVideoInputDevice: stub,

  // Direct Calls
  isBusy: false,
  currentCall: undefined,
  dial: stub,
  addDirectCallSound: stub,
  clearCalls: stub,

  // Rooms
  createRoom: stub,
  getCachedRoomById: stub,
  fetchRoomById: stub,
  RoomType: RoomType,
};

const CallContext = createContext<ContextType>(initialContext);

export default CallContext;

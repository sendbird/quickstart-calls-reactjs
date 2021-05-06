import type { Action } from './reducer';
import type {
  StatefulDirectCall,
  StatefulLocalParticipant,
  StatefulRemoteParticipant,
  StatefulRoom,
} from './types';
import type { DirectCall, LocalParticipant, Participant, RemoteParticipant, Room } from 'sendbird-calls';

const registerDirectCallListeners = (
  call: DirectCall,
  dispatchUpdate: (part: Partial<StatefulDirectCall>) => void,
) => {
  call.onEstablished = (call: DirectCall) => {
    dispatchUpdate({ callState: 'established' });
  };
  call.onConnected = (call: DirectCall) => {
    dispatchUpdate({ callState: 'connected' });
  };
  call.onReconnected = (call: DirectCall) => {
    dispatchUpdate({ callState: 'reconnected' });
  };
  call.onReconnecting = (call: DirectCall) => {
    dispatchUpdate({ callState: 'reconnecting' });
  };
  call.onEnded = (call: DirectCall) => {
    dispatchUpdate({ callState: 'ended' });
  };
  call.onRemoteAudioSettingsChanged = (call: DirectCall) => {
    dispatchUpdate({ isRemoteAudioEnabled: call.isRemoteAudioEnabled });
  };
  call.onRemoteVideoSettingsChanged = (call: DirectCall) => {
    dispatchUpdate({ isRemoteVideoEnabled: call.isRemoteVideoEnabled });
  };
  // onCustomItemsUpdated() {
  //
  // },
  // onCustomItemsDeleted() {
  //
  // },
};

export const statefyRoom = (
  room: Room,
  dispatch: React.Dispatch<Action>,
): StatefulRoom => {
  const dispatchUpdate = (part: Partial<StatefulRoom>) => {
    const payload = {
      roomId: room.roomId,
      ...part,
    };
    dispatch({ type: 'UPDATE_ROOM', payload });
  };

  const updateRoom = () => {
    dispatchUpdate(statefyRoom(room, dispatch));
  };

  const updateLocalParticipant = (participant: Partial<StatefulLocalParticipant>) => {
    dispatch({
      type: 'UPDATE_ROOM_LOCAL_PARTICIPANT',
      payload: {
        roomId: room.roomId,
        participant,
      },
    });
  };
  const upsertRemoteParticipant = (participant: RemoteParticipant) => {
    dispatch({
      type: 'UPSERT_ROOM_REMOTE_PARTICIPANT',
      payload: {
        roomId: room.roomId,
        participant: statefyRemoteParticipant(participant),
      },
    });
  };

  const deleteRemoteParticipant = (participant: RemoteParticipant) => {
    dispatch({
      type: 'DELETE_ROOM_REMOTE_PARTICIPANT',
      payload: {
        roomId: room.roomId,
        participantId: participant.participantId,
      }
    })
  }

  const statefulLocalParticipants = room.localParticipant ? [statefyLocalParticipant(room.localParticipant, updateLocalParticipant)] : [];
  const statefulRemoteParticipants = room.remoteParticipants.map(statefyRemoteParticipant);
  const statefulParticipants = [...statefulLocalParticipants, ...statefulRemoteParticipants];

  room.on('remoteParticipantEntered', upsertRemoteParticipant);
  room.on('remoteParticipantStreamStarted', upsertRemoteParticipant);
  room.on('remoteParticipantExited', deleteRemoteParticipant);
  room.on('remoteAudioSettingsChanged', upsertRemoteParticipant);
  room.on('remoteVideoSettingsChanged', upsertRemoteParticipant);
  room.on('error', error => {
    console.error(error); // TODO:
  });
  return {
    roomId: room.roomId,
    roomType: room.roomType,
    createdAt: room.createdAt,
    createdBy: room.createdBy,
    participants: statefulParticipants,
    localParticipant: statefulLocalParticipants[0],
    remoteParticipants: statefulRemoteParticipants,
    enter(params) {
      return room.enter(params).then(() => {
        updateRoom();
        return;
      });
    },
    exit() {
      room.exit();
      updateRoom();
    },
  };
};

export const statefyLocalParticipant = (
  participant: LocalParticipant,
  update: (participant: Partial<StatefulLocalParticipant>) => any,
): StatefulLocalParticipant => {
  return {
    participantId: participant.participantId,
    enteredAt: participant.enteredAt,
    updatedAt: participant.updatedAt,
    exitedAt: participant.exitedAt,
    duration: participant.duration,
    isLocalParticipant: participant.isLocalParticipant,
    state: participant.state,
    user: participant.user, // TODO: Statefy user
    isAudioEnabled: participant.isAudioEnabled,
    isVideoEnabled: participant.isVideoEnabled,
    setMediaView(mediaView: HTMLMediaElement) {
      return participant.setMediaView(mediaView);
    },
    setLocalMediaView(mediaView: HTMLMediaElement) {
      return participant.setLocalMediaView(mediaView);
    },
    muteMicrophone() {
      participant.muteMicrophone();
      update({ isAudioEnabled: false });
    },
    unmuteMicrophone() {
      participant.unmuteMicrophone();
      update({ isAudioEnabled: true });
    },
    startVideo() {
      participant.startVideo();
      update({ isVideoEnabled: true });
    },
    stopVideo() {
      participant.stopVideo();
      update({ isVideoEnabled: false });
    },
  };
};

export const statefyRemoteParticipant = (
  participant: RemoteParticipant,
): StatefulRemoteParticipant => {
  return {
    participantId: participant.participantId,
    enteredAt: participant.enteredAt,
    updatedAt: participant.updatedAt,
    exitedAt: participant.exitedAt,
    duration: participant.duration,
    isLocalParticipant: participant.isLocalParticipant,
    state: participant.state,
    user: participant.user, // TODO: Statefy user
    isAudioEnabled: participant.isAudioEnabled,
    isVideoEnabled: participant.isVideoEnabled,
    setMediaView(mediaView: HTMLMediaElement) {
      return participant.setMediaView(mediaView);
    },
  };
};

export const statefyDirectCall = (
  call: DirectCall,
  dispatch: React.Dispatch<Action>,
  registerListener: boolean = true,
): StatefulDirectCall => {
  const dispatchUpdate = (part: Partial<StatefulDirectCall>) => {
    const payload = {
      callId: call.callId,
      ...part,
    };
    dispatch({ type: 'UPDATE_CALL', payload });
  };

  if (registerListener) {
    registerDirectCallListeners(call, dispatchUpdate);
  }

  return {
    callState: (call.localUser.userId === call.caller.userId) ? 'dialing' : 'ringing',
    callId: call.callId,
    caller: call.caller, // This should not mutate
    callee: call.callee, // This should not mutate
    isVideoCall: call.isVideoCall,
    localUser: call.localUser, // This should not mutate
    remoteUser: call.remoteUser, // This should not mutate
    isLocalAudioEnabled: call.isLocalAudioEnabled,
    isRemoteAudioEnabled: call.isRemoteAudioEnabled,
    isLocalVideoEnabled: call.isLocalVideoEnabled,
    isRemoteVideoEnabled: call.isRemoteVideoEnabled,
    myRole: call.myRole,
    isOngoing: call.isOngoing,
    endedBy: call.endedBy, // This should not mutate
    isEnded: call.isEnded,
    endResult: call.endResult,
    // callLog: call.callLog, // This should not mutate
    // customItems: call.customItems, // This should not mutate
    localMediaView: call.localMediaView,
    remoteMediaView: call.remoteMediaView,

    setLocalMediaView(mediaView) {
      dispatchUpdate({ localMediaView: mediaView });
      return call.setLocalMediaView(mediaView);
    },
    setRemoteMediaView(mediaView) {
      dispatchUpdate({ remoteMediaView: mediaView });
      return call.setRemoteMediaView(mediaView);
    },

    stopVideo() {
      dispatchUpdate({ isLocalVideoEnabled: false });
      return call.stopVideo();
    },
    startVideo() {
      dispatchUpdate({ isLocalVideoEnabled: true });
      return call.startVideo();
    },
    getDuration() {
      return call.getDuration();
    },
    accept(params) {
      return call.accept(params);
    },
    end() {
      return call.end();
    },

    muteMicrophone() {
      dispatchUpdate({ isLocalAudioEnabled: false });
      return call.muteMicrophone();
    },
    unmuteMicrophone() {
      dispatchUpdate({ isLocalAudioEnabled: true });
      return call.unmuteMicrophone();
    },

    // captureLocalVideoView(callback?) {
    //   return call.captureLocalVideoView(callback);
    // },
    // captureRemoteVideoView(callback?) {
    //   return call.captureRemoteVideoView(callback);
    // },

    // updateCustomItems(customItems, callback?): Promise<> {
    // },
    // deleteCustomItems(customItemsKeys: string[], callback?): Promise<> {
    // },
    // deleteAllCustomItems(callback?): Promise<> {
    // },

    // startRecording(options): string {
    // },
    // stopRecording(recordingId: string): boolean {
    // },
  };
};

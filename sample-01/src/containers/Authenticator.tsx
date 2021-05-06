/**
 * This is temporary container for development purpose only.
 */
import { useEffect } from 'react';
import { SoundType } from 'sendbird-calls';
import type { AuthOption } from 'sendbird-calls';

import { useSbCalls } from 'lib/sendbird-calls';
import storage from 'lib/storage';

const Authenticator: React.FC = () => {
  const sbCalls = useSbCalls();
  useEffect(() => {
    const stored = storage.getItem('sbCalls');

    const appId = stored?.appId || process.env.REACT_APP_APP_ID || '';
    const userId = stored?.userId || process.env.REACT_APP_USER_ID || '';
    const accessToken = stored?.accessToken || process.env.REACT_APP_ACCESS_TOKEN || '';
    const IS_ACCESS_TOKEN_NEEDED = process.env.REACT_APP_IS_ACCESS_TOKEN_NEEDED === 'true';

    const option: AuthOption = { userId };
    if (IS_ACCESS_TOKEN_NEEDED) option.accessToken = accessToken;
    if (appId && userId) {
      sbCalls.init(appId);
      sbCalls.addDirectCallSound(SoundType.DIALING, '/sounds/Dialing.mp3');
      sbCalls.addDirectCallSound(SoundType.RINGING, '/sounds/Ringing.mp3');
      sbCalls.addDirectCallSound(SoundType.RECONNECTING, '/sounds/Reconnecting.mp3');
      sbCalls.addDirectCallSound(SoundType.RECONNECTED, '/sounds/Reconnected.mp3');
      sbCalls.auth(option);
    }
  }, []);
  return null;
};

export default Authenticator;

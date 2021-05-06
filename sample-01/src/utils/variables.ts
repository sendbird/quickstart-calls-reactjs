import { DirectCallOption } from 'lib/sendbird-calls';

export enum colors {
  navy50 = '#f6f8fc',
  navy80 = '#eef2fa',
  navy100 = '#dee2f2',
  navy200 = '#c9d0e6',
  navy300 = '#b6bdd7',
  navy400 = '#8a92ba',
  navy600 = '#595e8a',
  navy800 = '#353761',
  navy900 = '#212242',
  white = '#ffffff',
  purple50 = '#ededff',
  purple300 = '#825eeb',
  purple400 = '#6440c4',
  green300 = '#1fcca1',
  green400 = '#00998c',
  green500 = '#007a7a',
  red300 = '#f24d6b',
  red400 = '#d92148',
  mutegray = 'rgba(168, 168, 168, 0.38)',
}

export enum MEDIA_SIZES {
  desktop = 992,
  tablet = 640,
  main = 377,
  mobile = 320,
}

export function getCallOption(callOption?: DirectCallOption) {
  return {
    localMediaView: undefined,
    remoteMediaView: undefined,
    videoEnabled: true,
    audioEnabled: true,
    ...callOption,
  };
}

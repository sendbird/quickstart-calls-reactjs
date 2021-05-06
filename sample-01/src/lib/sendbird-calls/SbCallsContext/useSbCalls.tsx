import { useContext } from 'react';

import CallContext from './context';

/**
 * ```js
 * const {
 *   // Calls state:
 *   user,
 *   calls,
 *   audioInputDeviceInfo,
 *   audioOutputDeviceInfo,
 *   videoInputDeviceInfo,
 *   isAuthenticated,
 *   currentCall,
 *   isBusy,
 *   dispatch,
 *
 *   // Auth methods:
 *   init,
 *   auth,
 *   deauth,
 * } = useSbCalls();
 * ```
 *
 * Use the `useSbCalls` hook in your components to access the calls state and methods.
 */
const useSbCalls = () => useContext(CallContext);

export default useSbCalls;

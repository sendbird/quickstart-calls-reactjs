import { useEffect, useState } from 'react';

import PeriodicJob from 'utils/periodicJob';

export const CallingText = () => {
  const dots = ['.', '..', '...'];
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const job = new PeriodicJob((x, count) => {
      setFrame(count);
    });
    job.start();
    return () => { job.stop(); };
  }, []);
  return <span>Calling{dots[frame % 3]}</span>;
};


type RingingTextProps = { isVideoCall: boolean };
export const RingingText: React.FC<RingingTextProps> = ({ isVideoCall }) => {
  const dots = ['.', '..', '...'];
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const job = new PeriodicJob((x, count) => {
      setFrame(count);
    });
    job.start();
    return () => { job.stop(); };
  }, []);
  return <span>Incoming {isVideoCall ? 'video' : 'audio'} call{dots[frame % 3]}</span>;
};

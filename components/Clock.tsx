import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";

interface props {
  className?: string;
}

const Clock = ({ className }: props) => {
  const [time, setTime] = useState(moment());
  const nextDailyReset = moment()
    .utc()
    .set({ d: moment().day() + 2, h: 10, m: 0, s: 0, ms: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (ms: number) => {
    const temp = ms / 1000;
    const [days, hours, minutes, seconds] = [
      Math.floor(temp / 86400),
      Math.floor((temp % 86400) / 3600),
      Math.floor((temp % 3600) / 60),
      Math.floor(temp % 60),
    ];

    return (
      <React.Fragment>
        <span className="opacity-40">{days}d</span> {hours}h {minutes}m{" "}
        {seconds}s
      </React.Fragment>
    );
  };

  return (
    <span className={className}>
      {formatTime(nextDailyReset.utc().valueOf() - time.utc().valueOf())}
    </span>
  );
};

export default Clock;

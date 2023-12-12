import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";

const CountdownTimer = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState(
    Math.max(new Date(endDate) - new Date(startDate), 0)
  );

  useEffect(() => {
    if (new Date(startDate) > new Date() || new Date(endDate) < new Date()) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => {
        const newTimeLeft = Math.max(new Date(endDate) - new Date(), 0);
        if (newTimeLeft === 0) {
          clearInterval(intervalId);
        }
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startDate, endDate]);

  // This function now returns an object with the formatted time parts
  const formatTimeLeft = (time) => {
    return {
      seconds: Math.floor((time / 1000) % 60),
      minutes: Math.floor((time / 1000 / 60) % 60),
      hours: Math.floor((time / (1000 * 60 * 60)) % 24),
      days: Math.floor(time / (1000 * 60 * 60 * 24)),
    };
  };

  // Call the formatTimeLeft function with the current timeLeft
  const { days, hours, minutes, seconds } = formatTimeLeft(timeLeft);

  return (
    <div className="activity-countdown-container">
      <p className="activity-subtitle">เวลาคงเหลือ</p>

      <div className="activity-countdown-element">
        <span className="activity-countdown-time-label">{days}</span>
        <span className="activity-countdown-label">วัน</span>
      </div>
      <div className="activity-countdown-element">
        <span className="activity-countdown-time-label">{hours}</span>
        <span className="activity-countdown-label">ชั่วโมง</span>
      </div>
      <div className="activity-countdown-element">
        <span className="activity-countdown-time-label">{minutes}</span>
        <span className="activity-countdown-label">นาที</span>
      </div>
      <div className="activity-countdown-element">
        <span className="activity-countdown-time-label">{seconds}</span>
        <span className="activity-countdown-label">วินาที</span>
      </div>
    </div>
  );
};

export default CountdownTimer;

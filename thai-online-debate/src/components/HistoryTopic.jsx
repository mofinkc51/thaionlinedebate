import React, { useEffect, useState } from 'react'
import './HistoryTopic.css'

function HistoryTopic(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [dateAndTime, setdateAndTime] = useState({
    date: "",
    time: "",
  });
  const convertTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);
    const dbc_date = dateObj.toISOString().split("T")[0];
    const dbc_time = dateObj.toTimeString().split(" ")[0];

    setdateAndTime({ date: dbc_date, time: dbc_time });
  };
  useEffect(() => {
    convertTimestamp(props.timestamp);
  }, []);
  return (
    <div className='history-topic-component'>
        <p className='history-topic-date'>
            {dateAndTime.date + " - " + dateAndTime.time}
          </p>
        <div className='history-topic-box'>
          <a href={`/topic/${props.id}`}>
            <p className='history-topic-name'>{props.title}</p>
          </a>
        </div>
    </div>
  )
}

export default HistoryTopic
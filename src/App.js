import React, { useState, useEffect } from 'react';
import './App.css'; 

const EmployeeList = ({ employees, times, toggleClock }) => (
  <div>
    <h2>Employee List</h2>
    <ul>
      {employees.map((employee, index) => (
        <li key={index}>
          <div>
            {employee} - 
            <span 
              className={times[index].status === 'Clocked In' ? 'status-clocked-in' : 'status-clocked-out'}
            >
              {` ${times[index].status}`}
            </span>
            {times[index].lastTime && ` (Last Updated: ${times[index].lastTime})`}
          </div>
          <div className="button-container">
            <button onClick={() => toggleClock(index)}>
              {times[index].status === 'Clocked In' ? 'Clock Out' : 'Clock In'}
            </button>
            <span> | Total Hours: {times[index].totalHours.toFixed(2)}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const TimeTracker = () => {
  const [employees] = useState(['Jesper', 'Romarc', 'Harley', 'Jordan', 'Sherie']);
  const [times, setTimes] = useState(employees.map(() => ({
    status: 'Clocked Out',
    lastTime: null,
    totalHours: 0,
    inTime: null,
  })));

  const toggleClock = (index) => {
    const { status, totalHours, inTime } = times[index];
    const newStatus = status === 'Clocked In' ? 'Clocked Out' : 'Clocked In';
    const timestamp = new Date().toLocaleString();

    setTimes(times.map((time, i) => {
      if (i === index) {
        if (newStatus === 'Clocked In') {
          return { ...time, status: newStatus, lastTime: timestamp, inTime: new Date() };
        } else {
          const hoursWorked = (new Date() - inTime) / (1000 * 60 * 60);
          return { ...time, status: newStatus, lastTime: timestamp, totalHours: totalHours + hoursWorked, inTime: null };
        }
      }
      return time;
    }));
  };

  const resetTracking = () => {
    setTimes(employees.map(() => ({
      status: 'Clocked Out',
      lastTime: null,
      totalHours: 0,
      inTime: null,
    })));
  };

  useEffect(() => {
    times.forEach((time, index) => {
      console.log(`${employees[index]} is now ${time.status} at ${time.lastTime}`);
    });
  }, [times]);

  return (
    <div>
      <EmployeeList employees={employees} times={times} toggleClock={toggleClock} />
      <button className="reset-button" onClick={resetTracking}>
        Reset All Time Tracking
      </button>
    </div>
  );
};

const App = () => (
  <div className="App">
    <h1>Ellry Cafe Time Tracker</h1>
    <TimeTracker />
  </div>
);

export default App;

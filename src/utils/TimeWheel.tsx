import React, { useState, useEffect } from 'react';

interface TimeSelectWheelProps {
  onTimeSelect: (hour: string, minute: string, ampm: string) => void;
}

const TimeSelectWheel: React.FC<TimeSelectWheelProps> = ({ onTimeSelect }) => {
  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedAMPM, setSelectedAMPM] = useState('AM');

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, '0'),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const ampmOptions = ['AM', 'PM'];

  // Trigger callback on selection change
  useEffect(() => {
    onTimeSelect(selectedHour, selectedMinute, selectedAMPM);
  }, [selectedHour, selectedMinute, selectedAMPM, onTimeSelect]);

  return (
    <div className='flex justify-center gap-4'>
      {/* Hour Select */}
      <div className='flex flex-col items-center'>
        <label className='mb-2 text-sm font-bold md:text-base'>Hour</label>
        <select
          value={selectedHour}
          onChange={(e) => setSelectedHour(e.target.value)}
          className='h-10 w-24 rounded-md border border-gray-300 bg-white p-2 text-center text-lg md:text-xl'
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </div>

      {/* Minute Select */}
      <div className='flex flex-col items-center'>
        <label className='mb-2 text-sm font-bold md:text-base'>Minute</label>
        <select
          value={selectedMinute}
          onChange={(e) => setSelectedMinute(e.target.value)}
          className='h-10 w-24 rounded-md border border-gray-300 bg-white p-2 text-center text-lg md:text-xl'
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>

      {/* AM/PM Select */}
      <div className='flex flex-col items-center'>
        <label className='mb-2 text-sm font-bold md:text-base'>AM/PM</label>
        <select
          value={selectedAMPM}
          onChange={(e) => setSelectedAMPM(e.target.value)}
          className='h-10 w-24 rounded-md border border-gray-300 bg-white p-2 text-center text-lg md:text-xl'
        >
          {ampmOptions.map((ampm) => (
            <option key={ampm} value={ampm}>
              {ampm}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeSelectWheel;

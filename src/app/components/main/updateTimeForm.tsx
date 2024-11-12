'use client';
import { UpdateNewTime } from '@/actions/time';
import TimeScrollWheel from '@/utils/TimeWheel';
import { FormEvent, RefObject, useEffect, useState } from 'react';
import Image from 'next/image';

interface UpdateTimeProps {
  streakCount: number;
  streakId: string;
  totalTime: number;
  reportType: string;
  totalInputs: number;
  lastChecked: Date;
  formRef: RefObject<HTMLFormElement>;
}

export default function UpdateTime({
  totalTime,
  reportType,
  totalInputs,
  formRef,
  streakId,
}: UpdateTimeProps) {
  const [inputType, setInputType] = useState(reportType);
  const [timeInSeconds, setTimeInSeconds] = useState(totalTime);
  const [timeInputs, setTimeInputs] = useState(totalInputs);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setInputType(reportType);
  }, [reportType]);

  const formatAverageTime = () => {
    if (timeInputs === 0) return '0';

    const averageInSeconds = timeInSeconds / timeInputs;

    if (inputType === 'seconds')
      return `${averageInSeconds.toFixed(2)} seconds`;
    if (inputType === 'minutes')
      return `${(averageInSeconds / 60).toFixed(2)} minutes`;
    if (inputType === 'hours')
      return `${(averageInSeconds / 3600).toFixed(2)} hours`;
    if (inputType === 'StartEndTime')
      return `${averageInSeconds.toFixed(2)} seconds`; // Adjust as needed

    return `${averageInSeconds.toFixed(2)} seconds`;
  };

  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let newEntryInSeconds = 0;
    if (inputType === 'seconds') {
      newEntryInSeconds = Number(formData.get('seconds'));
    } else if (inputType === 'minutes') {
      const minutes = Number(formData.get('minutes'));
      const seconds = Number(formData.get('seconds') || 0);
      newEntryInSeconds = minutes * 60 + seconds;
    } else if (inputType === 'hours') {
      const hours = Number(formData.get('hours'));
      const minutes = Number(formData.get('minutes') || 0);
      const seconds = Number(formData.get('seconds') || 0);
      newEntryInSeconds = hours * 3600 + minutes * 60 + seconds;
    } else if (inputType === 'StartEndTime') {
      formData.append('totalTime', String(timeInSeconds));
    }

    formData.append('streakId', streakId);
    formData.append('newEntryInSeconds', String(newEntryInSeconds));

    const result = await UpdateNewTime(formData);

    if (result) {
      setShowBanner(true);
      setTimeInSeconds(result.totalTime);
      setTimeInputs(result.totalInputs);
      setTimeout(() => setShowBanner(false), 3000);
    }
  };

  const handleTimeSelect = (hour: string, minute: string, ampm: string) => {
    let hourIn24 = parseInt(hour, 10);
    const minuteInSeconds = parseInt(minute, 10) * 60;

    if (ampm === 'PM' && hourIn24 !== 12) hourIn24 += 12;
    if (ampm === 'AM' && hourIn24 === 12) hourIn24 = 0;

    setTimeInSeconds(hourIn24 * 3600 + minuteInSeconds);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      {showBanner && (
        <div className='absolute top-0 w-full justify-center rounded-xl border-4 border-green-900 bg-green-500 p-4'>
          <div className='flex flex-row items-center justify-center'>
            <h3 className='text-center text-xl'>Updated Count</h3>
            <Image
              src={'/streakFire.svg'}
              width={15}
              height={15}
              alt='logo'
              className='ml-2'
            />
          </div>
        </div>
      )}
      <form ref={formRef} onSubmit={update}>
        <input type='hidden' name='streakId' value={streakId} />
        <input type='hidden' name='timeInSeconds' value={timeInSeconds} />
        <input type='hidden' name='reportType' value={reportType} readOnly />
        <input type='hidden' name='timeInputs' value={timeInputs} readOnly />

        <h4 className='text-center text-xl'>Average Time</h4>
        <div className='flex w-full flex-row justify-center space-x-2'>
          <h4>{formatAverageTime()}</h4>
        </div>
        <div className='flex w-full flex-col'>
          <h4 className='text-center text-xl'>Enter today&apos;s time</h4>

          {inputType === 'hours' ? (
            <div className='flex flex-row justify-evenly space-x-2'>
              <input type='text' name='hours' placeholder='Hours' />
              <input type='text' name='minutes' placeholder='Mins' />
              <input type='text' name='seconds' placeholder='Secs' />
            </div>
          ) : inputType === 'minutes' ? (
            <div className='flex flex-row justify-evenly space-x-2'>
              <input type='text' name='minutes' placeholder='Mins' />
              <input type='text' name='seconds' placeholder='Secs' />
            </div>
          ) : inputType === 'seconds' ? (
            <input type='text' name='seconds' placeholder='Seconds' />
          ) : (
            <div className='flex w-full flex-col justify-center space-x-2'>
              <div>
                <h1 className='text-center'>Start Time</h1>
                <TimeScrollWheel onTimeSelect={handleTimeSelect} />
              </div>
              <div>
                <h1 className='text-center'>End Time</h1>
                <TimeScrollWheel onTimeSelect={handleTimeSelect} />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

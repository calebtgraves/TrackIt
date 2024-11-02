'use client';
import TimeScrollWheel from '@/utils/TimeWheel';
import { FormEvent, RefObject, useEffect, useState } from 'react';

interface UpdateTimeProps {
  streakId: string;
  totalTime: number;
  reportType: string;
  totalInputs: number;
  lastChecked: Date;
  formRef: RefObject<HTMLFormElement>; // Accept formRef as a prop
}

export default function UpdateTime({
  totalTime,
  reportType,
  totalInputs,
  formRef,
  streakId,
}: UpdateTimeProps) {
  const [inputType, setInputType] = useState('');
  const [timeInSeconds, setTimeInSeconds] = useState(totalTime);
  useEffect(() => {
    setInputType(reportType);
  }, [reportType]);
  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (inputType === 'StartEndTime') {
      formData.append('totalTime', String(timeInSeconds));
    }
    console.log('Form submitted');
    console.log(formData);
    // Add form submission logic here
  };

  const handleTimeSelect = (hour: string, minute: string, ampm: string) => {
    // Convert selected time to seconds
    let hourIn24 = parseInt(hour, 10);
    const minuteInSeconds = parseInt(minute, 10) * 60;

    if (ampm === 'PM' && hourIn24 !== 12) hourIn24 += 12;
    if (ampm === 'AM' && hourIn24 === 12) hourIn24 = 0;

    setTimeInSeconds(hourIn24 * 3600 + minuteInSeconds);
  };

  return (
    <div>
      <form ref={formRef} onSubmit={update}>
        {/*stores the id of the streak being updated*/}
        <input type='hidden' value={streakId} />
        {/*stores all the time in seconds*/}
        <input type='hidden' value={totalTime} />
        {/*the way you want to report the time HH:MM:SS or MM:SS or Ss or start and end time*/}
        <input type='hidden' value={reportType} readOnly />
        {/*calculating average time per input for count, quanity, time, check*/}
        <input type='hidden' value={totalInputs} readOnly />

        <h4 className='text-center text-xl'>Average Time</h4>
        <div className='flex w-full flex-row justify-center space-x-2'>
          <h4 className=''> {totalTime} seconds</h4>
        </div>
        <div className='flex w-full flex-col'>
          <h4 className='text-center text-xl'>Enter today&apos;s time</h4>

          {inputType === 'hours' ? (
            <div className='flex flex-row justify-evenly space-x-2'>
              <div className='flex w-16 justify-center rounded-md bg-slate-300 p-1'>
                <input
                  type='text'
                  name='hours'
                  placeholder='Hours'
                  className='w-full bg-slate-300'
                />
              </div>
              <div className='flex w-16 justify-center rounded-md bg-slate-300 p-1'>
                <input
                  type='text'
                  name='minutes'
                  placeholder='Mins'
                  className='w-full bg-slate-300'
                />
              </div>
              <div className='flex w-16 justify-center rounded-md bg-slate-300 p-1'>
                <input
                  type='text'
                  name='seconds'
                  placeholder='S'
                  className='w-full bg-slate-300'
                />
              </div>
            </div>
          ) : inputType === 'minutes' ? (
            <div className='flex flex-row justify-evenly space-x-2'>
              <div className='flex w-16 justify-center rounded-md bg-slate-300 p-1'>
                <input
                  type='text'
                  name='minutes'
                  placeholder='Mins'
                  className='w-full bg-slate-300'
                />
              </div>
              <div className='flex w-16 justify-center rounded-md bg-slate-300 p-1'>
                <input
                  type='text'
                  name='seconds'
                  placeholder='S'
                  className='w-full bg-slate-300'
                />
              </div>
            </div>
          ) : inputType === 'seconds' ? (
            <div className='flex w-full flex-row justify-center rounded-md border-[3px] border-black p-1'>
              <input type='text' name='seconds' placeholder='Seconds' />
            </div>
          ) : (
            <div className='flex w-full flex-col justify-center space-x-2'>
              <div className='w-full'>
                <h1 className='text-center'>Start Time</h1>
                <TimeScrollWheel onTimeSelect={handleTimeSelect} />
              </div>
              <div className='w-full'>
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

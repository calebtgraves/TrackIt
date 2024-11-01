'use client';
import { FormEvent, RefObject } from 'react';

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
  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
    // Add form submission logic here
  };

  return (
    <div>
      <h4>Average</h4>
      <form ref={formRef} onSubmit={update}>
        {/*stores all the time in seconds*/}
        <input type='text' value={totalTime} readOnly />

        {/*the way you want to report the time HH:MM:SS or MM:SS or Ss or start and end time*/}
        <input type='text' value={reportType} readOnly />

        {/*calculating average time per input for count, quanity, time, check*/}
        <input type='hidden' value={totalInputs} readOnly />

        {/*Change this to hidden later*/}
        <input type='hidden' value={streakId} />
      </form>
    </div>
  );
}

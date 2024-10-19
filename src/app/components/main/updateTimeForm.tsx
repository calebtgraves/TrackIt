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
        <input type='text' value={totalTime} readOnly />
        <input type='text' value={reportType} readOnly />
        <input type='text' value={totalInputs} readOnly />
        <input type='text' value={streakId} /> {/*Change this to hidden later*/}
      </form>
    </div>
  );
}

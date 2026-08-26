'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { submitLeave } from './actions';

const inputClass =
  'w-full border border-slate-200 rounded-lg px-3 py-2 mt-1.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400';
const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-slate-500';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition"
    >
      {pending ? 'Submitting…' : 'Submit Request'}
    </button>
  );
}

export default function LeaveForm() {
  const [state, formAction] = useActionState(submitLeave, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && !state.error) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Submit Leave Request</h2>

      {state?.error && (
        <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {state.error}
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input name="name" type="text" required className={inputClass} placeholder="e.g. John Doe" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Start Date</label>
            <input name="start_date" type="date" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>End Date</label>
            <input name="end_date" type="date" required className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Reason</label>
          <textarea
            name="reason"
            rows={3}
            required
            className={inputClass}
            placeholder="State your reason..."
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}

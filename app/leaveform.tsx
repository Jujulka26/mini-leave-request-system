'use client';

import { useActionState, useRef, useEffect } from 'react';
import { submitLeave } from './actions';

export default function LeaveForm() {
  const [state, formAction] = useActionState(submitLeave, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && !state.error) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Submit Leave Request</h2>

      {state?.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
          {state.error}
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="name"
            type="text"
            required
            className="w-full border border-gray-300 p-2 rounded mt-1 text-gray-900"
            placeholder="e.g. John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            name="startDate"
            type="date"
            required
            className="w-full border border-gray-300 p-2 rounded mt-1 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            name="endDate"
            type="date"
            required
            className="w-full border border-gray-300 p-2 rounded mt-1 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reason</label>
          <textarea
            name="reason"
            rows={3}
            required
            className="w-full border border-gray-300 p-2 rounded mt-1 text-gray-900"
            placeholder="State your reason..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium p-2 rounded hover:bg-blue-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
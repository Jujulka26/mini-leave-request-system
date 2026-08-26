'use server';

import { saveRequest, updateRequestStatus } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitLeave(prevState: { error?: string } | null, formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const start_date = formData.get('start_date') as string;
  const end_date = formData.get('end_date') as string;
  const reason = (formData.get('reason') as string)?.trim();

  if (!name || !start_date || !end_date || !reason) {
    return { error: 'All fields are required.' };
  }

  if (new Date(end_date) < new Date(start_date)) {
    return { error: 'End date must be greater than or equal to start date.' };
  }

  saveRequest({
    id: Date.now().toString(),
    name,
    start_date,
    end_date,
    reason,
    status: 'Pending',
  });

  revalidatePath('/');
  return { error: undefined };
}

export async function changeStatus(id: string, status: 'Approved' | 'Rejected') {
  updateRequestStatus(id, status);
  revalidatePath('/');
}
'use server';

import { saveRequest, updateRequestStatus } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitLeave(prevState: { error?: string } | null, formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const reason = (formData.get('reason') as string)?.trim();

  if (!name || !startDate || !endDate || !reason) {
    return { error: 'All fields are required.' };
  }

  if (new Date(endDate) < new Date(startDate)) {
    return { error: 'End date must be greater than or equal to start date.' };
  }

  saveRequest({
    id: Date.now().toString(),
    name,
    startDate,
    endDate,
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
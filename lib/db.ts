import fs from 'fs';
import path from 'path';
import { LeaveRequest } from '@/types';

const filePath = path.join(process.cwd(), 'data.json');

export function getRequests(): LeaveRequest[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveRequest(request: LeaveRequest): void {
  const requests = getRequests();
  requests.unshift(request);
  fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));
}

export function updateRequestStatus(id: string, status: 'Approved' | 'Rejected'): void {
  const requests = getRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index !== -1) {
    requests[index].status = status;
    fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));
  }
}
# Mini Leave Request System

Next.js application for managing employee leave requests. Features server-side validation, persistent local JSON storage, and status filtering.

## Tech Stack
- Next.js (App Router)
- React Server Actions
- Tailwind CSS

## Local Installation

1. Clone repository
2. Install dependencies:
   npm install

3. Run development server:
   npm run dev

4. Open http://localhost:3000 in browser.

## Features Implemented
- **End-to-end functionality**: Complete flow from submission to approval/rejection. Data persists in `data.json`.
- **Validation**: Server-side logic ensures all fields exist and `end_date >= start_date`.
- **Extra**: Tailwind CSS UI polish and status filter (All, Pending, Approved, Rejected).
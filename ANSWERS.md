# Scenario Questions

**S1. Overtime Claims module architecture**
*   **Database Tables:** `users` (id, role, name, manager_id), `overtime_claims` (id, user_id, date, total_hours, reason, status, approved_by, approved_at).
*   **Backend Endpoints:** `POST /api/claims` (submit claim), `GET /api/claims` (list claims), `GET /api/claims/[id]` (view claim details), `PATCH /api/claims/[id]` (update claim status).
*   **Frontend Pages:** `Claim Form` (staff submit overtime claims), `My Claims` (staff view their claim history and status), `Manager Dashboard` (managers view pending claims and approve or reject them).
*   **Permissions:** Staff can create and view only their own claims. Managers can view relevant staff claims and approve or reject them by updating the claim status.

**S2. Troubleshooting stuck "Pending" status**
1.  **Check the Approve API Request:** Use the browser's Network tab to confirm the approve request is sent with the correct leave request ID and status, and check whether it succeeds or returns an error.
2.  **Check the Backend Logic:** Verify that the backend receives the request and correctly updates the leave request status.
3.  **Check the Database:** Confirm that the actual database record has changed from Pending to Approved.
4.  **Check the Frontend Refresh/State:** If the database is updated correctly, investigate whether the frontend is displaying stale cached data or failing to update its state after refreshing the list.

**S3. API key leak remediation**
1.  **Revoke the Key First:** It has been public for two days, so treat it as compromised. Revoke it in the provider's dashboard and issue a replacement immediately, or escalate to whoever has access. Nothing else reduces the exposure.
2.  **Tell the Senior and Team Lead:** Privately message them, explain what I found and did, and get the new key into the team's secret manager.
3.  **Check for Misuse:** Review the provider's usage and audit logs for unauthorized calls or unexpected billing during the exposure window.
4.  **Purge History and Prevent Recurrence:** Remove the file with `git filter-repo`, coordinating the force-push with the team, add `.env` to `.gitignore`, and enable secret scanning. Purging does not undo the leak, since forks and clones may still hold it, which is why rotation comes first.

---

# About You

*   **Which part of the stack are you strongest in? Which do you want to learn?**  
    I am strongest in backend and full-stack development, particularly Java, Spring Boot, PostgreSQL, PHP, and Flutter. During this internship, I would like to further strengthen my Next.js and TypeScript skills while gaining more hands-on experience in modern web development.

*   **Link to one past project you're proud of — what was hard, what did you learn?**  
    [Pawpal Repo](https://github.com/Jujulka26/A251_pawpal)
    I built Pawpal, a mobile app for pet adoption and donations. The hardest part was integrating the Billplz payment gateway. It was my first time working with a third-party service I could not control, so I had to read the documentation carefully, test repeatedly with sandbox credentials, and handle the cases where a payment did not complete as expected. It taught me not to assume an external service will always respond the way I expect, and to confirm a payment's real status before updating anything in the app.

*   **Minimum 10-week internship — confirmed? Preferred start date?**  
    Yes, confirmed. My preferred start date is 21 September 2026.
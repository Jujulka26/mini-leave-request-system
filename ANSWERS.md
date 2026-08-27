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
1.  **Report Immediately:** Privately message the senior developer and the team lead right away so they know the key is exposed. 
2.  **Revoke the Key:** The team needs to immediately log into the provider's dashboard to revoke the old key and generate a new one.
3.  **Update .gitignore:** I would quickly push a commit to add `.env` to the `.gitignore` file so no one else accidentally commits it.
4.  **Clean Git History:** I would ask the senior how they want to handle removing the key from the Git history (e.g., using `git filter-repo`), since force-pushing a shared branch requires team coordination.

---

# About You

*   **Which part of the stack are you strongest in? Which do you want to learn?**
    I am strongest in Flutter, Java, Spring Boot, PostgreSQL, and PHP. During this internship, I really want to strengthen my Next.js skills and learn more about DevOps tools like Docker, Kubernetes, and Terraform.

*   **Link to one past project you're proud of — what was hard, what did you learn?**
    [Pawpal Repo](https://github.com/Jujulka26/A251_pawpal)
    I built Pawpal, a mobile app for pet adoption and donations. The hardest part was integrating the Billplz payment gateway and handling user profile images. Because image files are large, I learned to process the uploads asynchronously to prevent the app from freezing. This challenge also taught me the best practice of storing image URLs in the database rather than the heavy files themselves. Overall, it greatly improved my understanding of external APIs and performance optimization.

*   **Minimum 10-week internship — confirmed? Preferred start date?**
    Yes, confirmed. My preferred start date is 21 September 2026.
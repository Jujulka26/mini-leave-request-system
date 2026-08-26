# Scenario Questions

**S1. Overtime Claims module architecture**
*   **Database Tables:** `users` (id, role, name), `overtime_claims` (id, user_id, date, total_hours, reason, status).
*   **Backend Endpoints:** `POST /api/claims` (submit claim), `GET /api/claims` (list claims), `PATCH /api/claims/[id]` (update status).
*   **Frontend Pages:** `Claim Form` (for staff submission), `My Claims` (for staff to see their history), `Manager Dashboard` (to view all pending claims and approve/reject).
*   **Permissions:** Staff can only create and view their own claims. Managers can view all claims and update the status.

**S2. Troubleshooting stuck "Pending" status**
1.  **Check the Database:** Look at the actual database record to see if the status updated on the backend. If it did, the bug is on the frontend.
2.  **Check the Network Tab:** Open the browser's developer tools to see if the approve API call returned a 200 OK or failed silently with an error.
3.  **Check the Frontend Cache:** See if the UI is just showing stale data and hasn't properly refreshed after the successful backend update.
4.  **Check Backend Logic:** Ensure the backend function is actually saving the updated status before returning the success response.

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
    [Link to Pawpal Repo] 
    I built Pawpal, a mobile app for pet adoption and donations. The hardest part was integrating the Billplz payment gateway and handling user profile images. Because image files are large, I learned to process the uploads asynchronously to prevent the app from freezing. This challenge also taught me the best practice of storing image URLs in the database rather than the heavy files themselves. Overall, it greatly improved my understanding of external APIs and performance optimization.

*   **Minimum 10-week internship — confirmed? Preferred start date?**
    Yes, confirmed. My preferred start date is September 2026.
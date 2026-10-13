JAGADISH CYBERPUNK PORTFOLIO — SUPABASE SETUP

FILES
- index.html: portfolio page with Supabase JS CDN and admin email/password fields
- script.js: shared portfolio loading/saving, Supabase Auth login, and certificate uploads
- style.css: existing cyberpunk styling
- supabase-setup.sql: SQL for the table and row/storage policies

1. Create the table
   - Open Supabase Dashboard > SQL Editor > New query.
   - Run SECTION A in supabase-setup.sql.

2. Create your admin login
   - Open Authentication > Users > Add user.
   - Create a user with your own email and a strong password.
   - Copy that user's UUID.
   - In supabase-setup.sql, replace every YOUR_AUTH_USER_UUID with that UUID.
   - Run SECTION B in SQL Editor.

3. Create the certificates bucket
   - Open Storage > New bucket.
   - Name: certificates
   - Set Public bucket: ON (visitors must be able to open certificate URLs).
   - Save the bucket.
   - Run SECTION C after replacing the UUID placeholder.

4. Publish files to GitHub Pages
   - Upload index.html, script.js, and style.css together to the repository root.
   - Keep their names exactly as shown.
   - Wait for GitHub Pages to deploy, then hard-refresh the page.

5. Use admin mode
   - Click EDIT MODE.
   - Enter the exact email and password you created in Supabase Authentication.
   - Edit content and click SAVE ALL CHANGES. This publishes content to Supabase for every visitor.
   - Uploaded certificate files go to the public certificates bucket. Save portfolio changes after upload.

IMPORTANT
- The publishable key in script.js is designed to be visible in browser code. Security comes from the RLS and Storage policies, not from hiding that key.
- Never put a service_role key, secret key, or database password in these files.
- Before policies are set up, database writes and certificate uploads will fail. The site falls back to local/default display content until it can read the shared row.
- The first shared save publishes the current content in the editor. If you previously made important changes only in one browser's local storage, log in from that browser before saving so those changes are not overwritten by the shared/default copy.

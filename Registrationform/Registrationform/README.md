# Registration Form Demo

This small web app implements a registration form using plain HTML, CSS, and JavaScript.

Files:
- `index.html` — The form and page structure.
- `styles.css` — Styling for the form and result card.
- `script.js` — Handles submission, validation, and displays the formatted submission.

How to use:
- Open `index.html` in your browser (double-click or right-click -> Open with...).
- Or serve the folder with a simple static server (recommended for consistent behavior):

  ```powershell
  # from the project folder
  python -m http.server 8000
  # then open http://localhost:8000 in your browser
  ```

What it does on submit:
- Validates that required fields are filled and passwords match.
- Displays the submitted data in a formatted card below the form.
- Provides a Print and Close button for the displayed result.

Possible enhancements:
- Add stronger client-side validation and helpful error messages.
- Persist submissions to localStorage or a server.
- Add file upload and preview for profile images.

License: MIT (feel free to adapt).
# Mini Audit Trail Generator (Backend)

This backend provides two API routes for saving and retrieving text version history.
It compares the previous text with new text and generates an audit entry with added words, removed words, and word counts.

- GET /versions – Get all entries (history)

- POST/ save-version - Save a new entry

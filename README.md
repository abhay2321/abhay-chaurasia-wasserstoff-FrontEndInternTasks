# RealTime-Collaborative-TextEditor

A real-time collaborative text editor built with React, Firebase, and Quill.js that allows multiple users to edit documents simultaneously and add comments.

![App Screenshot]![SingleUser](https://github.com/user-attachments/assets/1721bcb3-9a00-43b5-a531-7f40584455f9)

![App Screenshort]![MultiUser](https://github.com/user-attachments/assets/440eb29c-6445-434a-91db-5ce7915e70e8)

## Features

- **Real-time collaboration**: Multiple users can edit the same document simultaneously
- **Comment system**: Add and delete comments on the document
- **Room-based access**: Create or join rooms with unique IDs
- **Anonymous authentication**: No sign-up required
- **Rich text editing**: Format text with bold, italic, headers, lists, etc.
- **Cursor position preservation**: Maintains your position during remote updates

## Technologies Used

- **Frontend**: React.js
- **Text Editor**: React Quill (Quill.js)
- **Backend**: Firebase
  - Firestore (Real-time database)
  - Authentication (Anonymous sign-in)
- **Styling**: CSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/RealTime-TextEditor.git
   cd RealTime-TextEditor
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase:

- Create a Firebase project at firebase.google.com
- Copy your Firebase config to src/firebase-config.ts
- Enable Firestore and Anonymous Authentication in Firebase Console

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Create or Join a Room:

- Enter a room ID to create a new room or join an existing one
- Share the room ID with collaborators

2. Edit the Document:

- All changes are saved automatically and synced in real-time
- Use the toolbar to format text

3. Add Comments:

- Type your comment in the input field and click "Post" or press Enter
- Delete your own comments by clicking the × button

4. Collaborate:

- See other users' changes as they type
- All participants see the same content in real-time

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

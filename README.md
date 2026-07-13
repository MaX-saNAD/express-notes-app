# Notes Web Application

A simple and robust Notes Web Application built using Node.js, Express, and EJS. The application uses a local JSON file for data storage and handles missing file errors automatically.

## 🚀 Features
- Create, View, Edit, and Delete notes (Full CRUD operations).
- Automatic database file creation if `notes.json` is missing (prevents server crashes).
- Simple and responsive UI styled with custom CSS.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript), CSS
- **Storage:** Local JSON file (`fs/promises`)

## 📁 Project Structure
```bash
├── data/
│   └── notes.json         # Local database (auto-generated if missing)
├── public/
│   └── style/
│       └── style.css      # Stylesheet for custom styling
├── views/
│   ├── index.ejs          # Home page displaying all notes
│   ├── note.ejs           # Single note detailed view
│   ├── form.ejs           # Form to create a new note
│   └── formEDIT.ejs       # Form to edit an existing note
├── index.js               # Main server and entry point file
└── package.json           # Dependencies and scripts
```

## ⚙️ Installation & Setup

Clone the repository:
```bash
git clone https://github.com/MaX-saNAD/express-notes-app
cd express-notes-app
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
node index.js
```

Now, open your browser and go to: http://localhost:3000

## 👨‍💻 Author
Max Sanad 
import { useState, useEffect } from "react";

function StickyNotes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    if (title.trim() === "" || text.trim() === "") return;

    setNotes([
      ...notes,
      {
        title,
        text,
      },
    ]);

    setTitle("");
    setText("");
  }

  function deleteNote(index) {
    const updatedNotes = notes.filter((note, i) => i !== index);
    setNotes(updatedNotes);
  }

  return (
    <div className="card">
      <h2>Sticky Notes 💌</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addNote}>Add Note</button>

      {notes.map((note, index) => (
        <div className="note-card" key={index}>
          <h3>{note.title}</h3>
          <p>{note.text}</p>

          <button onClick={() => deleteNote(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default StickyNotes;
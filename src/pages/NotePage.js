import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = ({ match }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  const createNote = async () => {
    await fetch(`/api/note/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const updateNote = async () => {
    await fetch(`/api/note/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const deleteNote = async () => {
    await fetch(`/api/note/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  const handleSubmit = () => {
    if (id !== "new" && note.body.length > 0) {
      updateNote();
    } else if (id !== "new" && note.body.length === 0) {
      deleteNote();
    } else if (id === "new" && note !== null) {
      createNote();
    }
    navigate("/");
  };

  useEffect(() => {
    const getNote = async () => {
      if (id === "new") return;
      const res = await fetch(`/api/note/${id}`);
      const data = await res.json();
      setNote(data);
    };

    getNote();
  }, [id]);

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => setNote({ ...note, body: e.target.value })}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;

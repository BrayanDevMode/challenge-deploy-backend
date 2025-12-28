import { useState, useEffect } from 'react';
import NoteService from './services/NoteService';

function App() {
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showArchived, setShowArchived] = useState(false);

    useEffect(() => {
        refreshNotes();
    }, []);

    const refreshNotes = () => {
        NoteService.getAll().then(response => {
            setNotes(response.data);
        });
        NoteService.getArchived().then(response => {
            setArchivedNotes(response.data);
        });
    };

    const saveNote = (e) => {
        e.preventDefault();
        const note = { title, content };
        NoteService.create(note).then(() => {
            refreshNotes();
            setTitle('');
            setContent('');
        });
    };

    const toggleArchive = (id) => {
        NoteService.toggleArchive(id).then(() => {
            refreshNotes();
        });
    };

    const deleteNote = (id) => {
        if(window.confirm("¿Seguro que quieres borrar esta nota?")) {
            NoteService.delete(id).then(() => {
                refreshNotes();
            });
        }
    };

    const renderNoteCard = (note) => (
        <div className="col-12 mb-3" key={note.id}>
            <div className={`card h-100 ${note.archived ? 'bg-light border-secondary' : 'border-primary'}`}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.content}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <button
                        className="btn btn-sm btn-warning"
                        onClick={() => toggleArchive(note.id)}
                    >
                        {note.archived ? 'Desarchivar' : 'Archivar'}
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteNote(note.id)}
                    >
                        Borrar
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Mis Notas 📝</h1>

            {/* Creation form */}
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5>Crear Nota</h5>
                    <form onSubmit={saveNote}>
                        <div className="mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                      <textarea
                          className="form-control"
                          placeholder="Contenido"
                          rows="2"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          required
                      ></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Guardar</button>
                    </form>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="d-flex justify-content-center mb-4">
                <button
                    className={`btn me-2 ${!showArchived ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setShowArchived(false)}
                >
                    Notas Activas ({notes.length})
                </button>
                <button
                    className={`btn ${showArchived ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    onClick={() => setShowArchived(true)}
                >
                    Notas Archivadas ({archivedNotes.length})
                </button>
            </div>

            {/* Notes list */}
            <div className="row">
                {showArchived
                    ? archivedNotes.map(renderNoteCard)
                    : notes.map(renderNoteCard)
                }

                {(!showArchived && notes.length === 0) && <p className="text-center text-muted">No hay notas activas.</p>}
                {(showArchived && archivedNotes.length === 0) && <p className="text-center text-muted">No hay notas archivadas.</p>}
            </div>
        </div>
    );
}

export default App;
import { useState, useEffect } from 'react';
import NoteService from './services/NoteService';

function App() {
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);

    // Form inputs
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryInput, setCategoryInput] = useState('');

    // Filters and Views
    const [showArchived, setShowArchived] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    // Load notes on startup
    useEffect(() => {
        refreshNotes();
    }, []);

    const refreshNotes = () => {
        NoteService.getAll().then(response => setNotes(response.data));
        NoteService.getArchived().then(response => setArchivedNotes(response.data));
    };

    const saveNote = (e) => {
        e.preventDefault();

        const categoriesArray = categoryInput
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0)
            .map(tagName => ({ name: tagName }));

        const note = {
            title,
            content,
            categories: categoriesArray
        };

        NoteService.create(note).then(() => {
            refreshNotes();
            setTitle('');
            setContent('');
            setCategoryInput('');
        });
    };

    const toggleArchive = (id) => {
        NoteService.toggleArchive(id).then(() => refreshNotes());
    };

    const deleteNote = (id) => {
        if(window.confirm("Are you sure you want to delete this note?")) {
            NoteService.delete(id).then(() => refreshNotes());
        }
    };

    const allNotes = [...notes, ...archivedNotes];
    const allCategories = Array.from(new Set(
        allNotes.flatMap(note => note.categories.map(c => c.name))
    ));

    const notesToShow = (showArchived ? archivedNotes : notes).filter(note => {
        if (!selectedCategory) return true;
        return note.categories.some(c => c.name === selectedCategory);
    });

    const renderNoteCard = (note) => (
        <div className="col-12 mb-3" key={note.id}>
            <div className={`card h-100 ${note.archived ? 'bg-light border-secondary' : 'border-primary'}`}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            {note.categories.map(cat => (
                                <span key={cat.id || cat.name} className="badge bg-info text-dark me-1">
                  {cat.name}
                </span>
                            ))}
                        </div>
                    </div>
                    <p className="card-text mt-2">{note.content}</p>
                </div>
                <div className="card-footer d-flex justify-content-end gap-2">
                    <button
                        className="btn btn-sm btn-warning"
                        onClick={() => toggleArchive(note.id)}
                    >
                        {note.archived ? 'Unarchive' : 'Archive'}
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteNote(note.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">My Notes 📝</h1>

            {/* creation form */}
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5>Create Note</h5>
                    <form onSubmit={saveNote}>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Categories (comma-separated, e.g., Work, Important)"
                                    value={categoryInput}
                                    onChange={(e) => setCategoryInput(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-2">
              <textarea
                  className="form-control"
                  placeholder="Content"
                  rows="2"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
              ></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Save</button>
                    </form>
                </div>
            </div>

            {/* View and filter buttons */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <button
                        className={`btn me-2 ${!showArchived ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setShowArchived(false)}
                    >
                        Active
                    </button>
                    <button
                        className={`btn ${showArchived ? 'btn-secondary' : 'btn-outline-secondary'}`}
                        onClick={() => setShowArchived(true)}
                    >
                        Archived
                    </button>
                </div>

                {/* Filter selector by category */}
                <div className="d-flex align-items-center">
                    <label className="me-2 fw-bold">Filter:</label>
                    <select
                        className="form-select w-auto"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All</option>
                        {allCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Notes list */}
            <div className="row">
                {notesToShow.map(renderNoteCard)}

                {notesToShow.length === 0 && (
                    <p className="text-center text-muted mt-3">
                        There are no notes to show in this view/filter.
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;

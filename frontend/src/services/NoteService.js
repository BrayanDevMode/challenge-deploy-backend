import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/notes";
class NoteService {
    getAll() {
        return axios.get(API_URL);
    }

    getArchived() {
        return axios.get(`${API_URL}/archived`);
    }

    create(note) {
        return axios.post(API_URL, note);
    }

    toggleArchive(id) {
        return axios.put(`${API_URL}/${id}/archive`);
    }

    delete(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new NoteService();
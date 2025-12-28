package com.example.backend.service;

import com.example.backend.model.Note;
import com.example.backend.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;
import java.util.HashSet;
import java.util.Set;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Note save(Note note) {
        if (note.getCategories() != null) {
            Set<Category> managedCategories = new HashSet<>();
            for (Category category : note.getCategories()) {
                Category existingCategory = categoryRepository.findByName(category.getName());
                if (existingCategory != null) {
                    managedCategories.add(existingCategory);
                } else {
                    managedCategories.add(categoryRepository.save(category));
                }
            }
            note.setCategories(managedCategories);
        }

        return noteRepository.save(note);
    }

    public void delete(Long id) {
        noteRepository.deleteById(id);
    }

    public List<Note> getActiveNotes() {
        return noteRepository.findByArchived(false);
    }

    public List<Note> getArchivedNotes() {
        return noteRepository.findByArchived(true);
    }

    public Note toggleArchive(Long id) {
        Optional<Note> noteOpt = noteRepository.findById(id);
        if (noteOpt.isPresent()) {
            Note note = noteOpt.get();
            note.setArchived(!note.isArchived());
            return noteRepository.save(note);
        }
        return null;
    }
}
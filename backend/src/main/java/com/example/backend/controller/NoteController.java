package com.example.backend.controller;

import com.example.backend.model.Note;
import com.example.backend.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping
    public Note saveNote(@RequestBody Note note) {
        return noteService.save(note);
    }

    @GetMapping
    public List<Note> getActiveNotes() {
        return noteService.getActiveNotes();
    }

    @GetMapping("/archived")
    public List<Note> getArchivedNotes() {
        return noteService.getArchivedNotes();
    }

    @PutMapping("/{id}/archive")
    public Note toggleArchive(@PathVariable Long id) {
        return noteService.toggleArchive(id);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteService.delete(id);
    }
}
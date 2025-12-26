package com.example.backend.repository;

import com.example.backend.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// Repository interface to handle database operations for Note entities
public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByArchived(boolean archived);

}
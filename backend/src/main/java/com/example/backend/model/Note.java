package com.example.backend.model;
import jakarta.persistence.*;
import lombok.Data;

// Maps this class to a database table
@Entity
// Generates getters and setters
@Data
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private boolean archived = false;
}

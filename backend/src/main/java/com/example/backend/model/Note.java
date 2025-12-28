package com.example.backend.model;
import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "note_categories",
            joinColumns = @JoinColumn(name = "note_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();
}

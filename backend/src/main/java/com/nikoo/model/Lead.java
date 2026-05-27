package com.nikoo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Entity
@Table(name = "leads",
    indexes = {
        @Index(name = "idx_phone", columnList = "phone"),
        @Index(name = "idx_created_at", columnList = "createdAt"),
        @Index(name = "idx_source", columnList = "source")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false, length = 100)
    private String name;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a valid 10-digit Indian mobile number")
    @Column(nullable = false, length = 15)
    private String phone;

    @Column(length = 150)
    private String email;

    @Column(length = 20)
    private String configInterest;

    @Column(length = 200)
    private String message;

    // Tracking — which button/section triggered the lead
    @Column(length = 80)
    private String source;          // e.g. "hero_form", "brochure_download"

    // UTM / Ad tracking
    @Column(length = 150)
    private String utmSource;       // e.g. "google"

    @Column(length = 150)
    private String utmMedium;       // e.g. "cpc"

    @Column(length = 150)
    private String utmCampaign;     // campaign name

    @Column(length = 200)
    private String gclid;           // Google Click ID

    @Column(length = 500)
    private String pageUrl;         // Full URL when form was submitted

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

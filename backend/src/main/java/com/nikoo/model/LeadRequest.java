package com.nikoo.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

// ── Incoming lead request ──────────────────────────────────────
@Data
public class LeadRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a valid 10-digit mobile number")
    private String phone;

    private String email;
    private String configInterest;
    private String message;

    // Tracking fields (optional, from frontend)
    private String source;
    private String utmSource;
    private String utmMedium;
    private String utmCampaign;
    private String gclid;
    private String pageUrl;
}

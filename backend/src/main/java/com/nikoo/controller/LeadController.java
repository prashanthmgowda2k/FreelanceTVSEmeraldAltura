package com.nikoo.controller;

import com.nikoo.model.ApiResponse;
import com.nikoo.model.Lead;
import com.nikoo.model.LeadRequest;
import com.nikoo.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
@Slf4j
public class LeadController {

    private final LeadService leadService;

    /**
     * POST /api/leads
     * Called by every CTA on the frontend before any gated action.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> createLead(
            @Valid @RequestBody LeadRequest request) {
        try {
            Lead saved = leadService.saveLead(request);

            Map<String, Object> data = new HashMap<>();
            data.put("leadId", saved.getId());
            data.put("source", saved.getSource());
            // For brochure: in production, return a signed URL or token
            if ("brochure_download".equals(saved.getSource())) {
                data.put("brochureUrl", "/static/brochure/nikoo-garden-estate-brochure.pdf");
            }

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.ok("Lead captured successfully", data));

        } catch (Exception e) {
            log.error("Error saving lead: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to save lead. Please try again."));
        }
    }

    /**
     * GET /api/leads
     * Returns all leads (admin use only — protect with auth in production!)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Lead>>> getAllLeads() {
        List<Lead> leads = leadService.getAllLeads();
        return ResponseEntity.ok(ApiResponse.ok("Leads fetched", leads));
    }

    /**
     * GET /api/leads/by-source?source=brochure_download
     */
    @GetMapping("/by-source")
    public ResponseEntity<ApiResponse<List<Lead>>> getBySource(@RequestParam String source) {
        List<Lead> leads = leadService.getLeadsBySource(source);
        return ResponseEntity.ok(ApiResponse.ok("Leads fetched for source: " + source, leads));
    }

    /**
     * GET /api/leads/stats
     * Quick dashboard numbers
     */
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", leadService.getAllLeads().size());
        stats.put("today", leadService.getTodaysLeadCount());
        return ResponseEntity.ok(ApiResponse.ok("Stats fetched", stats));
    }
}

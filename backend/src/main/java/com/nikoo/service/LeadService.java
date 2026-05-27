package com.nikoo.service;

import com.nikoo.model.Lead;
import com.nikoo.model.LeadRequest;
import com.nikoo.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class LeadService {

    private final LeadRepository leadRepository;

    /**
     * Save a new lead from any CTA source.
     * Duplicate phone numbers are allowed (same person may enquire multiple times
     * from different sources — track all interactions).
     */
    public Lead saveLead(LeadRequest req) {
        log.info("New lead received: phone={} source={} utmSource={}", req.getPhone(), req.getSource(), req.getUtmSource());

        Lead lead = Lead.builder()
                .name(req.getName().trim())
                .phone(req.getPhone().trim())
                .email(req.getEmail() != null ? req.getEmail().trim() : null)
                .configInterest(req.getConfigInterest())
                .message(req.getMessage())
                .source(req.getSource() != null ? req.getSource() : "unknown")
                .utmSource(req.getUtmSource())
                .utmMedium(req.getUtmMedium())
                .utmCampaign(req.getUtmCampaign())
                .gclid(req.getGclid())
                .pageUrl(req.getPageUrl())
                .build();

        Lead saved = leadRepository.save(lead);
        log.info("Lead saved successfully with id={}", saved.getId());
        return saved;
    }

    public List<Lead> getAllLeads() {
        return leadRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Lead> getLeadsBySource(String source) {
        return leadRepository.findBySourceOrderByCreatedAtDesc(source);
    }

    public Long getTodaysLeadCount() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        return leadRepository.countTodaysLeads(startOfDay);
    }
}

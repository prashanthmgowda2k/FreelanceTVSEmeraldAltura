package com.nikoo.repository;

import com.nikoo.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    // Find by phone (for deduplication)
    Optional<Lead> findTopByPhoneOrderByCreatedAtDesc(String phone);

    // Find all leads by source
    List<Lead> findBySourceOrderByCreatedAtDesc(String source);

    // Find leads in date range
    List<Lead> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime from, LocalDateTime to);

    // Count leads today
    @Query("SELECT COUNT(l) FROM Lead l WHERE l.createdAt >= :startOfDay")
    Long countTodaysLeads(LocalDateTime startOfDay);

    // All leads ordered by latest
    List<Lead> findAllByOrderByCreatedAtDesc();
}

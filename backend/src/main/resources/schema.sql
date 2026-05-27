-- Run this once to create the database
-- (Spring Boot will auto-create tables via ddl-auto=update)
-- This script is for reference and manual setup.

CREATE DATABASE IF NOT EXISTS nikoo_leads
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE nikoo_leads;

-- Table created automatically by Hibernate, but here for reference:
CREATE TABLE IF NOT EXISTS leads (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    phone         VARCHAR(15)   NOT NULL,
    email         VARCHAR(150),
    config_interest VARCHAR(20),
    message       TEXT,
    source        VARCHAR(80),
    utm_source    VARCHAR(150),
    utm_medium    VARCHAR(150),
    utm_campaign  VARCHAR(150),
    gclid         VARCHAR(200),
    page_url      VARCHAR(500),
    created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_phone      (phone),
    INDEX idx_source     (source),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

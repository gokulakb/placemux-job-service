CREATE TABLE job_events (
    id UUID PRIMARY KEY,
    job_id UUID,
    event_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);
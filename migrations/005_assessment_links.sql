CREATE TABLE assessment_links (
    id UUID PRIMARY KEY,
    job_id UUID REFERENCES jobs(id),
    assessment_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
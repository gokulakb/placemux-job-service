CREATE TABLE job_skill_thresholds (
    id UUID PRIMARY KEY,
    job_id UUID REFERENCES jobs(id),
    skill_id UUID REFERENCES skills(id),
    threshold_level INT
    CHECK (threshold_level BETWEEN 1 AND 100)
);
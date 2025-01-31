INSERT INTO "role" (id, name) VALUES 
    (gen_random_uuid(), 'ADMIN'),
    (gen_random_uuid(), 'TOUR_AGENCY'),
    (gen_random_uuid(), 'EVENT_AGENCY'),
    (gen_random_uuid(), 'TOUR_ORGANIZER'),
    (gen_random_uuid(), 'EVENT_ORGANIZER')
ON CONFLICT (name) DO NOTHING;

INSERT INTO "permission" (id, name) VALUES 
    (gen_random_uuid(), 'manage_users'),
    (gen_random_uuid(), 'create_event'),
    (gen_random_uuid(), 'create_tour'),
    (gen_random_uuid(), 'manage_event_organizers'),
    (gen_random_uuid(), 'manage_tour_organizers'),
    (gen_random_uuid(), 'view_reports')
ON CONFLICT (name) DO NOTHING;

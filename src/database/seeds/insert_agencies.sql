INSERT INTO "agency" (id, name) VALUES 
    (gen_random_uuid(), 'VK Admin'),
    (gen_random_uuid(), 'Tour Agency Alpha'),
    (gen_random_uuid(), 'Event Agency Beta')
ON CONFLICT (name) DO NOTHING;

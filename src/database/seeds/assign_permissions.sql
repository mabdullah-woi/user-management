INSERT INTO "join_role_permissions" (role_id, permission_id)
SELECT r.id, p.id FROM "role" r, "permission" p 
WHERE (r.name = 'ADMIN' AND p.name IN ('manage_users', 'create_event', 'create_tour', 'manage_event_organizers', 'manage_tour_organizers', 'view_reports'))
   OR (r.name = 'EVENT_AGENCY' AND p.name IN ('create_event', 'manage_event_organizers'))
   OR (r.name = 'TOUR_AGENCY' AND p.name IN ('create_tour', 'manage_tour_organizers'))
   OR (r.name = 'EVENT_ORGANIZER' AND p.name IN ('create_event'))
   OR (r.name = 'TOUR_ORGANIZER' AND p.name IN ('create_tour'))
ON CONFLICT DO NOTHING;
